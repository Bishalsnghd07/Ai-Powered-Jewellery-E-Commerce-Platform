import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
  RxAccessibility,
  RxHome,
  RxPerson,
  RxDashboard,
} from "react-icons/rx";

interface FollowUpOption {
  option: string;
  answer?: string;
  followUp?: FollowUpQuestion;
}

interface FollowUpQuestion {
  question: string;
  options: FollowUpOption[];
}

interface ChatbotDataItem {
  question: string;
  options: FollowUpOption[];
}

export const menuItems = [
  { name: "Home", path: "/" },
  { name: "Rings", path: "/rings" },
  { name: "Necklaces", path: "/necklaces" },
  { name: "Earrings", path: "/earrings" },
];

export const chatbotData: ChatbotDataItem[] = [
  {
    question: "How can I help you with our jewelry collection today?",
    options: [
      {
        option: "Browse Products",
        followUp: {
          question: "Which category interests you?",
          options: [
            {
              option: "Rings",
              answer:
                "We offer a stunning collection of rings including diamond, gold, and custom designs. <a href='/rings' class='text-amber-600 underline'>View our ring collection</a>",
            },
            {
              option: "Necklaces",
              answer:
                "Explore our necklaces ranging from delicate chains to statement pieces. <a href='/necklaces' class='text-amber-600 underline'>Browse necklaces</a>",
            },
            {
              option: "Earrings",
              answer:
                "Discover our earring selection including studs, hoops, and drops. <a href='/earrings' class='text-amber-600 underline'>See earrings</a>",
            },
          ],
        },
      },
      {
        option: "Order Assistance",
        followUp: {
          question: "What do you need help with?",
          options: [
            {
              option: "Track my order",
              answer:
                "Please enter your order number and I'll check the status for you. You can also <a href='/track-order' class='text-amber-600 underline'>visit the order tracking page</a>.",
            },
            {
              option: "Return an item",
              answer:
                "Our 30-day return policy covers all items. <a href='/returns' class='text-amber-600 underline'>Start your return here</a> or would you like me to guide you through the process?",
            },
            {
              option: "Custom order",
              answer:
                "We specialize in custom jewelry designs. Please <a href='/contact' class='text-amber-600 underline'>contact our design team</a> with your requirements.",
            },
          ],
        },
      },
      {
        option: "Product Information",
        followUp: {
          question: "What would you like to know?",
          options: [
            {
              option: "Materials & Quality",
              answer:
                "All our jewelry uses ethically-sourced materials: 14K/18K gold, conflict-free diamonds, and genuine gemstones. Each piece comes with a certificate of authenticity.",
            },
            {
              option: "Sizing Guide",
              answer:
                "We provide detailed sizing charts for rings and necklaces. <a href='/sizing' class='text-amber-600 underline'>View our sizing guide</a> or I can help you determine your size.",
            },
            {
              option: "Care Instructions",
              answer:
                "To maintain your jewelry's shine: Avoid chemicals, store properly, and clean with our included polishing cloth. <a href='/care' class='text-amber-600 underline'>Full care guide here</a>.",
            },
          ],
        },
      },
      {
        option: "Payment & Shipping",
        followUp: {
          question: "What would you like to know?",
          options: [
            {
              option: "Payment Options",
              answer:
                "We accept all major credit cards, PayPal, and offer financing through Affirm. All transactions are securely processed.",
            },
            {
              option: "Shipping Information",
              answer:
                "Free express shipping on all orders over $500. Delivery typically takes 2-3 business days. <a href='/shipping' class='text-amber-600 underline'>Full shipping details</a>.",
            },
            {
              option: "International Orders",
              answer:
                "We ship worldwide with DHL Express. Duties/taxes may apply. <a href='/international' class='text-amber-600 underline'>See international shipping info</a>.",
            },
          ],
        },
      },
      {
        option: "Contact Support",
        followUp: {
          question: "How would you like to reach us?",
          options: [
            {
              option: "Live Chat",
              answer:
                "You're already chatting with me! I can help with most inquiries or connect you to a human agent if needed.",
            },
            {
              option: "Email",
              answer:
                "Email us at support@luxejewels.com and we'll respond within 24 hours.",
            },
            {
              option: "Phone",
              answer: "Call our concierge at (888) 555-0123 (9am-9pm EST).",
            },
            {
              option: "Store Visit",
              answer:
                "Visit our NYC flagship at 5th Avenue. <a href='/locations' class='text-amber-600 underline'>View store hours and directions</a>.",
            },
          ],
        },
      },
    ],
  },
];
