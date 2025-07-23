"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartDropdown } from "./CartDropdown";

const Navbar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Rings", path: "/rings" },
    { name: "Necklaces", path: "/necklaces" },
    { name: "Earrings", path: "/earrings" },
  ];

  return (
    <>
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          <span className="text-[#d4af37]">Luxe</span>Jewels
        </h1>
      </Link>

      <div className="hidden md:flex gap-8 flex-1 justify-center items-center">
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
      </div>

      <CartDropdown />
    </>
  );
};

export default Navbar;
