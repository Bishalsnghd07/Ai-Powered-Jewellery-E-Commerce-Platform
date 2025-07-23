"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, delay } from "framer-motion";

export function CartDropdown() {
  const { cartItems, cartItemCount, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      filter: "blur(8px)",
      transition: {
        ease: [0.33, 1, 0.68, 1], // Smooth bezier curve
        duration: 1,
        delay: 1.2,
        staggerChildren: 0.1,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 14, // Higher = less bounce
        stiffness: 52, // Lower = softer spring
        mass: 1.5, // Higher = heavier feel
        restDelta: 0.0001, // More precise settling
        duration: 2.2, // Longer duration
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      filter: "blur(4px)",
      transition: {
        ease: [0.33, 1, 0.68, 1], // Smooth bezier curve
        duration: 1,
        delay: 1.2,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative bg-gray-200">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-[#D87D4A]">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            asChild
            forceMount
            className="w-80 p-4"
            align="end"
            sideOffset={18}
          >
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-md shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">CART ({cartItemCount})</h3>
                  {cartItemCount > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Remove all
                    </button>
                  )}
                </div>

                {cartItemCount === 0 ? (
                  <p className="text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <ShoppingCart className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              x{item.quantity}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <span className="text-sm text-gray-500">TOTAL</span>
                      <span className="font-bold">${cartTotal.toFixed(2)}</span>
                    </div>

                    <Link href="/checkout" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#D87D4A] hover:bg-[#e39165]">
                        CHECKOUT
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}
