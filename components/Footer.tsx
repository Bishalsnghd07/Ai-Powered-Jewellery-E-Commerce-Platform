import { menuItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="flex flex-col bg-[#191919]">
      <div className="flex flex-col md:flex-row md:justify-between items-center w-full py-8 px-32 gap-8">
        <a href="/" className="flex-row text-3xl font-semibold text-white">
          LuxeJewels
        </a>
        <li className="flex flex-col md:flex-row text-base items-center font-medium text-white gap-4 pt-4 md:pt-0">
          {menuItems.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              className={`text-white hover:text-[#D87D4A] transition-colors text-base font-semibold uppercase tracking-wider ${
                pathname === item.path ? "text-[#d4af37]" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </li>
      </div>
      <div className="flex w-full text-white py-4 px-8 md:px-32 md:max-w-[51rem] text-sm opacity-55 tracking-wide">
        LuxeJewels brings you the finest craftsmanship in jewelry making. Each
        piece is meticulously crafted by our master jewelers using
        ethically-sourced materials and traditional techniques.
      </div>
      <div className="flex flex-col-reverse md:flex-row-reverse md:justify-between w-full text-white py-4 md:px-32">
        <div className="flex justify-center md:justify-end gap-4">
          {/* Keep social links same */}
        </div>
        <div className="flex text-sm opacity-55 tracking-wide font-semibold pb-8 md:pb-24 pt-4 md:pt-12 justify-center md:justify-start">
          Copyright 2025. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
