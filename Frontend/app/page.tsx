"use client";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/ChatBot";
import WelcomePopup from "@/components/ui/welcomePopup";
import { useState } from "react";
import JewelryMarquee from "@/components/ui/jewellary-marque";

export default function Home() {
  const categories = [
    {
      title: "RINGS",
      href: "/rings",
      imageSrc: "/jewelry/category-rings.jpg",
    },
    {
      title: "NECKLACES",
      href: "/necklaces",
      imageSrc: "/jewelry/category-necklaces.jpg",
    },
    {
      title: "EARRINGS",
      href: "/earrings",
      imageSrc: "/jewelry/category-earrings.jpg",
    },
  ];

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [autoMessage, setAutoMessage] = useState<string | null>(null);

  const handleOpenChatbot = (message: string | null = null) => {
    setAutoMessage(message); // Save the message to pass to the bot
    setIsChatbotOpen(true);
  };

  // ADD THIS FUNCTION:
  const clearAutoMessage = () => {
    setAutoMessage(null);
  };

  return (
    <main className="w-full overflow-x-hidden">
      <WelcomePopup onOpenChatbot={handleOpenChatbot} />
      <HeroSection />
      <JewelryMarquee />
      <div className="flex flex-col md:flex-row justify-center items-center w-full px-4 pt-24 md:pt-32 pb-16 md:pb-20 gap-[6.8rem] md:gap-[3rem] bg-white">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            href={category.href}
            imageSrc={category.imageSrc}
          />
        ))}
      </div>
      <AboutSection />
      <Chatbot
        initialOpen={isChatbotOpen}
        autoMessage={autoMessage}
        onMessageProcessed={clearAutoMessage} // Pass the function to clear the autoMessage after it's processed
      />
      <Footer />
    </main>
  );
}
