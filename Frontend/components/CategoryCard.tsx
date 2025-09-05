"use client";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  href: string;
  imageSrc: string;
  compact?: boolean;
  imageWidth?: number;
  imageHeight?: number;
}

export default function CategoryCard({
  title,
  href,
  imageSrc,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      scroll={false}
      className="relative group w-full md:max-w-[19rem]"
    >
      <div className="flex flex-col bg-gray-100 rounded-lg h-auto pt-20 px-6 pb-4 overflow-visible">
        <p className="text-lg font-bold text-center tracking-wider pt-2">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm font-semibold tracking-wider text-gray-600 group-hover:text-orange-500 transition-colors justify-center w-full">
          <span>SHOP</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div className="absolute top-[-4.6rem] left-1/2 transform -translate-x-1/2 w-[150px] h-[150px]">
          <Image
            src={imageSrc}
            alt={`${title} Thumbnail`}
            fill
            className="object-contain drop-shadow-md rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
}
