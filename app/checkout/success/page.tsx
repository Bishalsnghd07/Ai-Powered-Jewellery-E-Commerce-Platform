"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-4">THANK YOU FOR YOUR ORDER</h1>
        <p className="text-gray-500 mb-6">
          You will receive an email confirmation shortly.
        </p>

        <Link href="/">
          <Button className="w-full bg-[#D87D4A] hover:bg-[#e39165]">
            BACK TO HOME
          </Button>
        </Link>
      </div>
    </div>
  );
}
