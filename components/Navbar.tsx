"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartDropdown } from "./CartDropdown";
import { motion } from "framer-motion";

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

      <nav className="hidden md:flex gap-8 flex-1 justify-center items-center">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.name}
              className="relative text-base font-semibold uppercase tracking-wider"
            >
              <span
                className={`relative z-10 ${
                  isActive
                    ? "text-[#e2bb39]"
                    : "text-white hover:text-[#d4af37]"
                }`}
              >
                {item.name}
              </span>

              {isActive && (
                <motion.span
                  layoutId="activeNavItem"
                  className="absolute bg-[#d4af37]/10 rounded-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
      <CartDropdown />
    </>
  );
};

export default Navbar;
