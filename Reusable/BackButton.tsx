"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 opacity-55 hover:opacity-100 hover:text-[#D87D4A] transition-all duration-300 px-0 py-8 md:px-8 md:py-8 text-[#b96636] "
    >
      <FiArrowLeft className="text-2xl" />
      <span className="text-xl font-medium">Go Back</span>
    </button>
  );
};

export default BackButton;
