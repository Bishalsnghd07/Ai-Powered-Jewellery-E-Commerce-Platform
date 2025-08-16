import Razorpay from "razorpay";

interface NormalizedRazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
  receipt?: string;
  created_at: number;
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayOrder = async (
  amountInRupees: number
): Promise<NormalizedRazorpayOrder> => {
  try {
    const order = await razorpay.orders.create({
      amount: amountInRupees * 100,
      currency: "INR",
      payment_capture: true,
    });

    return {
      id: order.id,
      amount: parseInt(order.amount as string, 10),
      currency: order.currency,
      status: order.status,
      receipt: order.receipt || undefined,
      created_at: order.created_at,
    };
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    throw new Error("Payment processing failed");
  }
};
