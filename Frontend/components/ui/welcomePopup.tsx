import React, { useState, useEffect } from "react";

interface WelcomePopupProps {
  onOpenChatbot: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onOpenChatbot }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we've shown the popup before using localStorage
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcomePopup");

    // Show popup after a brief delay if it hasn't been seen before
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("hasSeenWelcomePopup", "true");
      }, 1500); // Show after 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    handleClose();
    onOpenChatbot();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-6">
            Hi there! 👋 Welcome to our website. How can we help you today?
          </p>

          <div className="space-y-3">
            <button
              onClick={handleButtonClick}
              className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Chat with Us
            </button>

            <button
              onClick={handleButtonClick}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Explore on My Own
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
