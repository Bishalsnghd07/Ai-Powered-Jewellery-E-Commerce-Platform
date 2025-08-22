"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Inbox, AlertCircle } from "lucide-react"; // Import Lucide icons

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-4">THANK YOU FOR YOUR ORDER</h1>

        {orderId && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="font-medium">
              Order ID:{" "}
              <span className="font-mono text-[#D87D4A]">{orderId}</span>
            </p>
          </div>
        )}

        <div className="mb-6">
          <p className="mb-3">
            A confirmation email has been sent to your registered address.
          </p>

          {/* Enhanced email delivery notice */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">
                  Can&apos;t find the email?
                </h3>
                <p className="text-blue-700 text-sm">
                  Please check your{" "}
                  <span className="font-semibold">spam/junk folder </span> if
                  you don&lsquo;t see it in your inbox within 5 minutes. Marking
                  us as &quot;Not Spam&ldquo; ensures future delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/">
          <Button className="w-full bg-[#D87D4A] hover:bg-[#e39165]">
            BACK TO HOME
          </Button>
        </Link>
      </div>
    </div>
  );
}
