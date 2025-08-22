"use strict";
// // controllers/order.controller.ts
// import { NextRequest, NextResponse } from "next/server";
// import { OrderService } from "../services/order.service";
// import { connectDB } from "@/utils/db";
// import { IOrder } from "@/types/order.types";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
const email_service_1 = require("../services/email.service");
const payment_service_1 = require("../services/payment.service");
class OrderController {
    static async createOrder(req, res) {
        try {
            const { customer, products, paymentMethod, paymentMode } = req.body;
            // Validate required fields
            if (!customer?.email || !products?.length || !paymentMethod) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            // If Razorpay is used, validate payment mode
            if (paymentMethod !== "cod" &&
                !["upi", "netbanking", "card", "wallet"].includes(paymentMode)) {
                console.log("DEBUG: Invalid payment mode check triggered");
                console.log("DEBUG: paymentMethod =", paymentMethod);
                console.log("DEBUG: paymentMode =", paymentMode);
                console.log("DEBUG: Allowed modes =", [
                    "upi",
                    "netbanking",
                    "card",
                    "wallet",
                ]);
                console.log("DEBUG: Mode matches? =", ["upi", "netbanking", "card", "wallet"].includes(paymentMode));
                return res.status(400).json({ error: "Invalid payment mode" });
            }
            // Calculate totals
            const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const shipping = 50;
            const tax = subtotal * 0.2;
            const total = subtotal + shipping + tax;
            // Create order
            const order = await order_model_1.default.create({
                customer: {
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                },
                products: products.map((p) => ({
                    productId: p.id || p.productId,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity,
                    imageUrl: p.imageUrl,
                })),
                subtotal,
                shipping,
                tax,
                total,
                payment: {
                    method: paymentMethod,
                    mode: paymentMethod === "cod" ? null : paymentMode,
                },
                status: paymentMethod === "cod" ? "processing" : "payment_pending",
                orderId: `ORD-${Date.now()}`,
            });
            // COD orders → send email immediately
            if (paymentMethod === "cod" && order.customer?.email) {
                await (0, email_service_1.sendOrderConfirmation)(order.customer.email, {
                    id: order.orderId,
                    items: order.products.map((p) => ({
                        name: p.name,
                        price: p.price,
                        quantity: p.quantity,
                        imageUrl: p.imageUrl,
                    })),
                    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                });
                return res.status(201).json({
                    success: true,
                    orderId: order.orderId,
                });
            }
            // Razorpay orders → create payment order
            const razorpayOrder = await (0, payment_service_1.createRazorpayOrder)(total);
            if (!razorpayOrder?.id) {
                throw new Error("Razorpay order creation failed");
            }
            return res.status(201).json({
                success: true,
                orderId: order.orderId,
                razorpayOrderId: razorpayOrder.id,
                amount: total,
            });
        }
        catch (error) {
            console.error("Order creation error:", error);
            res.status(400).json({
                error: error instanceof Error ? error.message : "Order creation failed",
            });
        }
    }
}
exports.default = OrderController;
