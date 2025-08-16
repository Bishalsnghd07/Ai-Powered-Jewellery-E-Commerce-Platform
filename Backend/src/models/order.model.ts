import mongoose from "mongoose";

// Product sub-schema
const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String },
  },
  { _id: false }
);

// Payment sub-schema
const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
      enum: ["cod", "upi", "netbanking", "card", "wallet", null], // method of order processing
      default: "cod",
    },
    mode: {
      // actual payment mode chosen by customer
      type: String,
      enum: ["upi", "netbanking", "card", "wallet", null],
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, default: "" },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
    products: {
      type: [productSchema],
      required: true,
      validate: {
        validator: (v: any[]) => v.length > 0,
        message: "At least one product is required",
      },
    },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    orderId: { type: String, required: true, unique: true },
    payment: paymentSchema,
    status: {
      type: String,
      required: true,
      enum: [
        "processing",
        "payment_pending",
        "paid",
        "failed",
        "shipped",
        "delivered",
      ],
      default: "processing",
    },
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reload
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

export default mongoose.model("Order", orderSchema);
