"use client";

import { useEffect } from "react";

export default function ProductCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryMap: Record<string, string> = {
    headphones: "Headphones",
    speakers: "Speakers",
    earphones: "Earphones",
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categoryName = categoryMap[params.category] || params.category;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-24 bg-[#191919] text-white">
      <h1 className="text-4xl font-bold mb-6 text-center md:text-left">
        {categoryName} Collection
      </h1>
      <p className="text-xl text-gray-400 mb-8 text-center md:text-left">
        This page is under development. Coming soon!
      </p>
      <div className="flex gap-4">
        <a
          href="/"
          className="px-6 py-3 bg-[#D87D4A] hover:bg-[#f0ab82] rounded-md transition-colors"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
