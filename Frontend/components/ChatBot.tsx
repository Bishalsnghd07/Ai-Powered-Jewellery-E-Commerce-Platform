import React, { useState, useEffect, useRef } from "react";
import { chatbotData } from "@/constants";

interface ChatbotProps {
  initialOpen?: boolean;
}

interface FollowUpOption {
  option: string;
  answer?: string;
  followUp?: FollowUpQuestion;
}

interface FollowUpQuestion {
  question: string;
  options: FollowUpOption[];
  answer?: string;
}

interface ChatbotDataItem {
  question: string;
  options: FollowUpOption[];
  answer?: string;
}

interface ChatMessage {
  sender: string;
  text: string;
  followUpQuestions?: FollowUpOption[];
}

const Chatbot: React.FC<ChatbotProps> = ({ initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [navHistory, setNavHistory] = useState<FollowUpOption[][]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Add this useEffect to handle changes to initialOpen
  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

  // Add scroll ref
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add scroll effect
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Trigger when messages change

  // AI Response Function using Hugging Face API
  const getAIResponse = async (inputText: string): Promise<string> => {
    try {
      setIsAiThinking(true);

      // Using a free AI API (Hugging Face Inference API)
      // You'll need to create a free account at huggingface.co and get an API token
      const HUGGING_FACE_API_KEY =
        process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY || ""; // Set your API key in .env.local
      const response = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`, // Replace with your API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: inputText }),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Invalid API token. Please check your Hugging Face token."
          );
        } else if (response.status === 503) {
          // Model is loading, need to wait
          return "The AI model is loading. Please try again in a few moments.";
        } else {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }
      }

      const result = await response.json();
      setIsAiThinking(false);

      if (result.error) {
        console.error("AI API Error:", result.error);
        return "I'm having trouble connecting to the AI service right now. Please try again later.";
      }

      // Extract the generated text from the response
      return result.generated_text || "I'm not sure how to respond to that.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setIsAiThinking(false);
      return "Sorry, I encountered an error while processing your request.";
    }
  };

  // Fallback to a simple rule-based response if API calls fail
  const getFallbackResponse = (inputText: string): string => {
    const lowerCaseInput = inputText.toLowerCase();

    // Simple keyword matching as fallback
    if (lowerCaseInput.includes("thank"))
      return "You're welcome! Is there anything else I can help with?";
    if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi"))
      return "Hello! How can I assist you today?";
    if (lowerCaseInput.includes("help"))
      return "I'm here to help! What do you need assistance with?";
    if (lowerCaseInput.includes("bye") || lowerCaseInput.includes("goodbye"))
      return "Goodbye! Feel free to come back if you have more questions.";

    return "I'm not sure how to respond to that. Could you try asking in a different way?";
  };

  const handleBack = () => {
    if (navHistory.length > 1) {
      // Only allow back if there's history
      setMessages((prev) => {
        // Remove last user-bot pair (last 2 messages)
        const newMessages = prev.slice(0, -2);
        return newMessages;
      });
      setNavHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: inputText }]);

    const lowerCaseInput = inputText.toLowerCase();

    const findResponse = (
      data: ChatbotDataItem[],
      input: string
    ): { text: string; followUpQuestions?: FollowUpOption[] } | null => {
      // Handle greetings first
      const greetings = ["hi", "hello", "hey", "hola", "howdy"];
      if (greetings.includes(input)) {
        return {
          text: "Hello buddy! How may I help you? 😊",
          followUpQuestions: data[0].options, // Show first-level options
        };
      }

      // Check direct matches in main questions
      for (const item of data) {
        if (item.question.toLowerCase() === input) {
          return {
            text: item.answer || item.question,
            followUpQuestions: item.options,
          };
        }
      }

      // Search nested options recursively
      const searchNestedOptions = (
        options: FollowUpOption[]
      ): ReturnType<typeof findResponse> => {
        for (const option of options) {
          if (option.option.toLowerCase() === input) {
            if (option.answer) {
              return { text: option.answer };
            }
            if (option.followUp) {
              return {
                text: option.followUp.question,
                followUpQuestions: option.followUp.options,
              };
            }
          }

          if (option.followUp) {
            const nestedResult = searchNestedOptions(option.followUp.options);
            if (nestedResult) return nestedResult;
          }
        }
        return null;
      };

      for (const item of data) {
        const result = searchNestedOptions(item.options);
        if (result) return result;
      }

      return null;
    };

    const matchedResponse = findResponse(chatbotData, lowerCaseInput);

    if (matchedResponse) {
      // Corrected messages update with proper scoping
      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          {
            sender: "bot",
            text:
              matchedResponse?.text ||
              "Sorry, I don't have an answer for that.",
            followUpQuestions: matchedResponse?.followUpQuestions,
          },
        ];

        // Update navigation history using correct references
        if (matchedResponse?.followUpQuestions) {
          setNavHistory((prevHistory) => [
            ...prevHistory,
            prevMessages.length > 0
              ? prevMessages[prevMessages.length - 1]?.followUpQuestions || []
              : chatbotData[0].options,
          ]);
        }

        return newMessages;
      });
    } else {
      // If no predefined response found, use AI
      try {
        // Try Hugging Face API first
        let aiResponse = await getAIResponse(inputText);

        // If the API returns an error, use the fallback
        if (
          aiResponse.includes("trouble connecting") ||
          aiResponse.includes("error")
        ) {
          aiResponse = getFallbackResponse(inputText);
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: aiResponse,
          },
        ]);
      } catch (error) {
        // If all else fails, use the fallback response
        const fallbackResponse = getFallbackResponse(inputText);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: fallbackResponse,
          },
        ]);
      }
    }
  };

  const handleBackToMenu = () => setMessages([]);

  // 2. Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setUserInput(transcript);
          handleSendMessage(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // 3. Add microphone toggle function
  const toggleMicrophone = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <>
      <div className="group fixed bottom-20 md:bottom-4 right-6 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-yellow-600 text-white px-3 py-[0.4rem] rounded-full shadow-lg 
                 hover:bg-yellow-700 transition-all duration-300
                 ring-0 hover:ring-8 ring-red-100/50"
        >
          Chat 💬
          <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping-slow opacity-0 group-hover:opacity-100"></span>
        </button>

        <div
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 transition-opacity 
                    duration-200 delay-300 pointer-events-none"
        >
          <div
            className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg 
                       shadow-xl flex items-center gap-2 relative
                       before:content-[''] before:absolute before:top-full before:left-1/2
                       before:-translate-x-1/2 before:w-3 before:h-1.5 before:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Ask me anything!
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[19rem] h-[25rem] bg-white rounded-xl shadow-lg border-none flex flex-col z-10">
          <div className="flex items-center justify-between p-3 bg-yellow-600 text-white rounded-t-lg flex-wrap">
            {navHistory.length > 1 && (
              <button
                onClick={handleBack}
                className="hover:bg-yellow-700 p-1 rounded-md"
              >
                ←
              </button>
            )}
            <h3 className="text-lg font-semibold">Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="space-y-2">
                <p className="text-gray-600 mb-2">
                  👋 Hello there, what would you like to know?
                </p>
                {chatbotData.map((data, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(data.question)}
                    className="w-full text-left bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg text-sm"
                  >
                    {data.question}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  {msg.sender === "user" ? (
                    <div className="text-right">
                      <span className="inline-block px-3 py-2 bg-blue-500 text-white rounded-lg">
                        {msg.text}
                      </span>
                    </div>
                  ) : (
                    <div className="text-left">
                      <span className="inline-block px-3 py-2 bg-gray-200 text-black rounded-lg">
                        {msg.text}
                      </span>
                      {msg.followUpQuestions && (
                        <div className="mt-2 space-y-1">
                          {msg.followUpQuestions.map((followUp, i) => (
                            <button
                              key={i}
                              onClick={() => handleSendMessage(followUp.option)}
                              className="w-full text-left bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg text-sm"
                            >
                              {followUp.option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
            {isAiThinking && (
              <div className="text-left">
                <span className="inline-block px-3 py-2 bg-gray-200 text-black rounded-lg">
                  Thinking...
                  <span className="inline-block ml-2 animate-pulse">🤔</span>
                </span>
              </div>
            )}
            {/* Add this empty div at the end */}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t">
            <button
              onClick={handleBackToMenu}
              className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 px-3 py-2"
            >
              Back to Main Menu
            </button>
          </div>

          <div className="p-3 border-t bg-white flex items-center gap-1 w-full">
            {/* Flexible Input Container */}
            <div className="flex-1 flex items-center gap-1 min-w-0">
              <input
                type="text"
                className="flex-1 min-w-0 px-3 py-2 border rounded-lg focus:outline-none"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendMessage(userInput)
                }
                disabled={isAiThinking}
              />
            </div>

            {/* Action Buttons - will now stay on same line */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={toggleMicrophone}
                disabled={isAiThinking}
                className={`p-2 rounded-full ${
                  isListening ? "bg-red-500" : "bg-gray-200"
                } hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {/* Microphone icon SVG */}
                {isListening ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              <button
                onClick={() => handleSendMessage(userInput)}
                disabled={!userInput.trim() || isAiThinking}
                className={`p-2 rounded-full ${
                  userInput.trim() && !isAiThinking
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white transition-colors`}
                title="Send message"
              >
                {/* Arrow up icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
