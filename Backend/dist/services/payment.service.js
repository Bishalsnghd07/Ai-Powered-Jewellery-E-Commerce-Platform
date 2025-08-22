"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRazorpayOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const createRazorpayOrder = async (amountInRupees) => {
    try {
        const order = await razorpay.orders.create({
            amount: amountInRupees * 100,
            currency: "INR",
            payment_capture: true,
        });
        return {
            id: order.id,
            amount: parseInt(order.amount, 10),
            currency: order.currency,
            status: order.status,
            receipt: order.receipt || undefined,
            created_at: order.created_at,
        };
    }
    catch (error) {
        console.error("Razorpay order creation failed:", error);
        throw new Error("Payment processing failed");
    }
};
exports.createRazorpayOrder = createRazorpayOrder;
