"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "e-Money", // or "Cash on Delivery"
    eMoneyNumber: "",
    eMoneyPIN: "",
  });

  const shippingFee = 50;
  const vat = Math.round(cartTotal * 0.2); // 20% VAT
  const grandTotal = cartTotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and clear cart
    clearCart();
    // Redirect to confirmation page
    window.location.href = "/checkout/success";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-8">CHECKOUT</h1>

          {/* Billing Details */}
          <section className="mb-12">
            <h2 className="text-sm font-bold text-[#D87D4A] mb-4">
              BILLING DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded p-3 text-sm"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border rounded p-3 text-sm"
                  placeholder="test@test.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border rounded p-3 text-sm"
                  placeholder="123.456.789"
                />
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          <section className="mb-12">
            <h2 className="text-sm font-bold text-[#D87D4A] mb-4">
              SHIPPING INFO
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold mb-2">
                  Your Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full border rounded p-3 text-sm"
                  placeholder="Warszawska 1000"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    className="w-full border rounded p-3 text-sm"
                    placeholder="00-000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full border rounded p-3 text-sm"
                    placeholder="Warszawa"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full border rounded p-3 text-sm"
                  placeholder="Poland"
                />
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section>
            <h2 className="text-sm font-bold text-[#D87D4A] mb-4">
              PAYMENT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className="text-xs font-bold">Payment Method</label>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-3 border rounded hover:border-[#D87D4A]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "e-Money"}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: "e-Money" })
                    }
                    className="h-4 w-4 text-[#D87D4A]"
                  />
                  <span>e-Money</span>
                </label>
                <label className="flex items-center gap-4 p-3 border rounded hover:border-[#D87D4A]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "Cash on Delivery"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        paymentMethod: "Cash on Delivery",
                      })
                    }
                    className="h-4 w-4 text-[#D87D4A]"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            {formData.paymentMethod === "e-Money" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2">
                    e-Money Number
                  </label>
                  <input
                    type="text"
                    value={formData.eMoneyNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, eMoneyNumber: e.target.value })
                    }
                    className="w-full border rounded p-3 text-sm"
                    placeholder="238521993"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">
                    e-Money PIN
                  </label>
                  <input
                    type="text"
                    value={formData.eMoneyPIN}
                    onChange={(e) =>
                      setFormData({ ...formData, eMoneyPIN: e.target.value })
                    }
                    className="w-full border rounded p-3 text-sm"
                    placeholder="6891"
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column - Summary */}
        <div className="bg-white rounded-lg p-6 h-fit">
          <h2 className="text-lg font-bold mb-6">SUMMARY</h2>

          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                    {/* Replace with actual image */}
                    {/* <span className="text-xs">IMG</span> */}
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
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">TOTAL</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">SHIPPING</span>
              <span className="font-bold">${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">VAT (INCLUDED)</span>
              <span className="font-bold">${vat.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <span className="text-sm text-gray-500">GRAND TOTAL</span>
            <span className="font-bold text-[#D87D4A]">
              ${grandTotal.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#D87D4A] hover:bg-[#e39165]"
            disabled={cartItems.length === 0}
          >
            CONTINUE & PAY
          </Button>
        </div>
      </div>
    </div>
  );
}
