// payment.controller.ts
import { Request, Response } from "express";
import Order from "../models/order.model";
import { sendOrderConfirmation } from "../services/email.service";
import Razorpay from "razorpay";

import crypto from "crypto";

export const verifyPayment = async (req: Request, res: Response) => {
  const {
    orderId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  try {
    // 1. Verify the signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await Order.updateOne({ orderId }, { status: "failed" });
      return res.status(400).json({ error: "Invalid signature" });
    }

    // 2. Capture payment info in DB
    await Order.updateOne(
      { orderId },
      {
        status: "paid",
        "payment.razorpay_payment_id": razorpay_payment_id,
        "payment.razorpay_order_id": razorpay_order_id,
        "payment.razorpay_signature": razorpay_signature,
      }
    );

    // 3. Send confirmation email
    const order = await Order.findOne({ orderId });
    if (order?.customer?.email) {
      await sendOrderConfirmation(order.customer.email, {
        id: order.orderId,
        items: order.products.map((p) => ({
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          imageUrl: p.imageUrl ?? undefined,
        })),
        estimatedDelivery: new Date(
          Date.now() + 5 * 86400000
        ).toLocaleDateString(),
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.log("Payment verification failed:", error);
    console.log("Order ID:", orderId);
    console.log("Payment ID:", razorpay_payment_id);
    await Order.updateOne({ orderId }, { status: "failed" });
    res.status(400).json({ error: "Payment verification failed" });
  }
};

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const verifyPayment = async (req: Request, res: Response) => {
//   const { orderId, paymentId } = req.body;

//   try {
//     // 1. Verify with Razorpay
//     const payment = await razorpay.payments.fetch(paymentId);

//     // 2. Update order if successful
//     if (payment.status === "captured") {
//       await Order.updateOne(
//         { orderId },
//         {
//           status: "paid",
//           "payment.razorpay_payment_id": paymentId,
//         }
//       );

//       // 3. Send confirmation email
//       const order = await Order.findOne({ orderId });
//       if (!order || !order.customer) {
//         throw new Error("Order or customer not found");
//       }
//       await sendOrderConfirmation(order.customer.email, {
//         id: order.orderId,
//         items: order.products.map((p) => ({
//           name: p.name,
//           price: p.price,
//           quantity: p.quantity,
//           imageUrl: p.imageUrl ?? undefined,
//         })),
//         estimatedDelivery: new Date(
//           Date.now() + 5 * 24 * 60 * 60 * 1000
//         ).toLocaleDateString(),
//       });
//     }

//     res.json({ success: true });
//   } catch (error) {
//     await Order.updateOne({ orderId }, { status: "failed" });
//     res.status(400).json({ error: "Payment verification failed" });
//   }
// };
