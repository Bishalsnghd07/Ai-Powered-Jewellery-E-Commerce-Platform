"use client";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/ChatBot";

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

  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />

      <div className="flex flex-col md:flex-row justify-center items-center w-full px-4 pt-36 pb-16 md:pb-20 gap-[6.8rem] md:gap-[3rem] bg-white">
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
      <Chatbot />
      <Footer />
    </main>
  );
}
