"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { API_BASE_URL, createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckoutFormValues, checkoutSchema } from "../validations/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

const banks = [
  { value: "SBIN", label: "State Bank of India" },
  { value: "HDFC", label: "HDFC Bank" },
  { value: "ICIC", label: "ICICI Bank" },
];

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMode: "upi",
      paymentMethod: "upi",
    },
  });

  const paymentMode = watch("paymentMode");

  const shippingFee = 50;
  const vat = Math.round(cartTotal * 0.2);
  const grandTotal = cartTotal + shippingFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )
      ) {
        return resolve(true);
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (formData: CheckoutFormValues) => {
    try {
      const subtotal = cartTotal;
      const shipping = 50;
      const tax = cartTotal * 0.2;
      const total = subtotal + shipping + tax;

      const orderData = {
        customer: { ...formData, address: formData.address },
        products: cartItems.map((item) => ({
          productId: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.image || "",
        })),
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod: formData.paymentMethod,
        paymentMode: formData.paymentMode,
        upiId: formData.paymentMode === "upi" ? formData.upiId : undefined,
        selectedBank:
          formData.paymentMode === "netbanking"
            ? formData.selectedBank
            : undefined,
        orderId: `ORD-${Date.now()}`,
      };

      const response = await createOrder(orderData);

      // COD flow — no Razorpay
      if (formData.paymentMethod === "cod") {
        clearCart();
        router.push(`/checkout/success?orderId=${response.orderId}`);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        Swal.fire("Error", "Razorpay SDK failed to load", "error");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: response.amount * 100,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: response.razorpayOrderId,
        handler: async (razorpayResponse: any) => {
          const verifyRes = await fetch(
            `${API_BASE_URL}/api/orders/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.orderId,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
              }),
            }
          );

          if (verifyRes.ok) {
            clearCart();
            router.push(`/checkout/success?orderId=${response.orderId}`);
          } else {
            const err = await verifyRes.json();
            Swal.fire(
              "Payment Failed",
              err.error || "Verification failed",
              "error"
            );
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#F37254" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      Swal.fire("Error", error.message || "Order submission failed", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("name")}
                    className="w-full border rounded p-3 text-sm"
                    placeholder="Jan Kowalski"
                    // required
                  />
                  {errors.name && (
                    <p className="text-[#d60910]">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    className="w-full border rounded p-3 text-sm"
                    placeholder="test@test.com"
                  />
                  {errors.email && (
                    <p className="text-[#d60910]">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full border rounded p-3 text-sm"
                    placeholder="123.456.789"
                  />
                  {errors.phone && (
                    <p className="text-[#d60910]">{errors.phone.message}</p>
                  )}
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
                    Street Address
                  </label>
                  <input
                    {...register("address.street")}
                    className="w-full border rounded p-3 text-sm"
                    placeholder="Warszawska 1000"
                  />{" "}
                  {errors.address?.street && (
                    <p className="text-[#d60910]">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2">
                      ZIP Code
                    </label>
                    <input
                      {...register("address.zipCode")}
                      className="w-full border rounded p-3 text-sm"
                      placeholder="00-000"
                    />
                    {errors.address?.zipCode && (
                      <p className="text-[#d60910]">
                        {errors.address.zipCode.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2">City</label>
                    <input
                      {...register("address.city")}
                      className="w-full border rounded p-3 text-sm"
                      placeholder="Warszawa"
                    />{" "}
                    {errors.address?.city && (
                      <p className="text-[#d60910]">
                        {errors.address.city.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">State</label>
                  <input
                    {...register("address.state")}
                    className="w-full border rounded p-3 text-sm"
                    placeholder="Mazovia"
                  />{" "}
                  {errors.address?.state && (
                    <p className="text-[#d60910]">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">
                    Country
                  </label>
                  <input
                    {...register("address.country")}
                    className="w-full border rounded p-3 text-sm"
                    placeholder="Poland"
                  />
                  {errors.address?.country && (
                    <p className="text-[#d60910]">
                      {errors.address.country.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section>
              <h2 className="text-sm font-bold text-[#D87D4A] mb-4">
                PAYMENT DETAILS
              </h2>

              <RadioGroup
                value={watch("paymentMode")}
                onValueChange={(value) =>
                  setValue(
                    "paymentMode",
                    value as "upi" | "netbanking" | "card" | "wallet" | "cod"
                  )
                }
                className="grid gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Label className="text-sm font-semibold self-center">
                    Payment Method
                  </Label>
                  <div className="space-y-3">
                    {/* UPI Option */}
                    <div className="flex items-center space-x-4 p-3 border rounded hover:border-[#D87D4A]">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="w-full">
                        <div>
                          <span>UPI</span>
                          {watch("paymentMode") === "upi" && (
                            <div className="mt-2">
                              <Input
                                {...register("upiId")}
                                placeholder="yourname@upi"
                              />{" "}
                              {errors.upiId && (
                                <p className="text-[#d60910] text-sm">
                                  {errors.upiId.message}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </Label>
                    </div>
                    <Select>
                      <Label className="flex items-center gap-4 p-3 border rounded hover:border-[#D87D4A]">
                        <RadioGroupItem value="cod" id="cod" />
                        <SelectValue placeholder="Cash on Delivery" />
                      </Label>
                    </Select>

                    {/* NetBanking Option */}
                    <div className="flex items-center space-x-4 p-3 border rounded hover:border-[#D87D4A]">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="w-full">
                        <div>
                          <span>NetBanking</span>
                          {watch("paymentMode") === "netbanking" && (
                            <div className="mt-2">
                              <Select
                                onValueChange={(value) =>
                                  setValue("selectedBank", value)
                                }
                                value={watch("selectedBank") || ""}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Bank" />
                                </SelectTrigger>
                                <SelectContent>
                                  {banks.map((bank) => (
                                    <SelectItem
                                      key={bank.value}
                                      value={bank.value}
                                    >
                                      {bank.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.selectedBank && (
                                <p className="text-[#d60910] text-sm">
                                  {errors.selectedBank.message}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </Label>
                    </div>

                    {/* Card Option */}
                    <div className="flex items-center space-x-4 p-3 border rounded hover:border-[#D87D4A]">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </section>
          </div>

          {/* Right Column - Summary */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="text-lg font-bold mb-6">SUMMARY</h2>

            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
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
              type="submit"
              className="w-full bg-[#D87D4A] hover:bg-[#e39165]"
              disabled={cartItems.length === 0}
            >
              CONTINUE & PAY
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
