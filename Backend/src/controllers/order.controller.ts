// // controllers/order.controller.ts
// import { NextRequest, NextResponse } from "next/server";
// import { OrderService } from "../services/order.service";
// import { connectDB } from "@/utils/db";
// import { IOrder } from "@/types/order.types";

// export class OrderController {
//   private orderService: OrderService;

//   constructor() {
//     this.orderService = new OrderService();
//   }

//   async createOrder(req: NextRequest): Promise<NextResponse> {
//     try {
//       await connectDB();
//       const body = await req.json();

//       const order = await this.orderService.createOrder(body);

//       return NextResponse.json(
//         {
//           success: true,
//           orderId: order.orderId
//         },
//         { status: 201 }
//       );
//     } catch (error: any) {
//       return NextResponse.json(
//         { error: error.message || 'Order creation failed' },
//         { status: 400 }
//       );
//     }
//   }

//   async getOrder(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
//     try {
//       await connectToDB();
//       const order = await this.orderService.getOrderDetails(params.id);

//       return NextResponse.json(order);
//     } catch (error: any) {
//       return NextResponse.json(
//         { error: error.message || 'Order not found' },
//         { status: 404 }
//       );
//     }
//   }
// }

// controllers/order.controller.ts
// import { NextRequest, NextResponse } from "next/server";
// import { OrderService } from "../services/order.service";
// import connectDB from "../config/db"; // Corrected import path
// import { IOrder } from "../types/order.types";

// export class OrderController {
//   private orderService: OrderService;

//   constructor() {
//     this.orderService = new OrderService();
//   }

//   async createOrder(req: NextRequest): Promise<NextResponse> {
//     try {
//       console.log("Incoming request headers:", req.headers);

//       await connectDB();
//       const body = await req.json();
//       console.log("Parsed request body:", body);

//       if (!body.products || body.products.length === 0) {
//         console.warn("Validation failed: No products in order");
//         return NextResponse.json(
//           { error: "At least one product is required" },
//           { status: 400 }
//         );
//       }

//       const order = await this.orderService.createOrder(body);
//       console.log("Created order:", order);

//       return NextResponse.json(
//         {
//           success: true,
//           orderId: order.orderId,
//         },
//         { status: 201 }
//       );
//     } catch (error: any) {
//       console.error("Controller error:", error);
//       return NextResponse.json(
//         { error: error.message || "Order creation failed" },
//         { status: 400 }
//       );
//     }
//   }

//   async getOrder(
//     req: NextRequest,
//     { params }: { params: { id: string } }
//   ): Promise<NextResponse> {
//     try {
//       await connectDB(); // Now using the correct connectDB function
//       const order = await this.orderService.getOrderDetails(params.id);

//       return NextResponse.json(order);
//     } catch (error: any) {
//       return NextResponse.json(
//         { error: error.message || "Order not found" },
//         { status: 404 }
//       );
//     }
//   }
// }

// src/controllers/order.controller.ts
// import { Request, Response } from "express";
// import Order from "../models/order.model";

// export default class OrderController {
//   static async createOrder(req: Request, res: Response) {
//     try {
//       const order = await Order.create(req.body);
//       res.status(201).json({ success: true, orderId: order.orderId });
//     } catch (error) {
//       res.status(400).json({
//         error: error instanceof Error ? error.message : "Order creation failed",
//       });
//     }
//   }

//   static async getOrderById(req: Request, res: Response) {
//     try {
//       const order = await Order.findById(req.params.id);
//       if (!order) {
//         return res.status(404).json({ error: "Order not found" });
//       }
//       res.json(order);
//     } catch (error) {
//       res.status(400).json({
//         error: error instanceof Error ? error.message : "Failed to fetch order",
//       });
//     }
//   }
// }

// controllers/order.controller.ts
// import { Request, Response } from "express";
// import Order from "../models/order.model";
// import { sendOrderConfirmation } from "../services/email.service";

// export default class OrderController {
//   static async createOrder(req: Request, res: Response) {
//     try {
//       const { customer, products, paymentMethod } = req.body;

//       // Calculate order values
//       const subtotal = products.reduce(
//         (sum: number, item: any) => sum + item.price * item.quantity,
//         0
//       );
//       const shipping = 50; // Fixed shipping cost
//       const tax = subtotal * 0.2; // 20% tax
//       const total = subtotal + shipping + tax;

//       // Create order with all required fields
//       // Create order with all required fields
//       // Update the order creation section
//       const order = await Order.create({
//         customer: {
//           name: customer.name,
//           email: customer.email,
//           phone: customer.phone,
//           address: customer.address, // Use the nested address object
//         },
//         products: products.map((p: any) => ({
//           productId: p.id || p.productId,
//           name: p.name,
//           price: p.price,
//           quantity: p.quantity,
//           imageUrl: p.imageUrl,
//         })),
//         subtotal,
//         shipping,
//         tax,
//         total,
//         paymentMethod,
//         orderId: `ORD-${Date.now()}`,
//       })

//       if (order.customer && order.customer.email) {
//         await sendOrderConfirmation(order.customer.email, {
//           id: order.orderId,
//           items: order.products.map((p: any) => ({
//             name: p.name,
//             price: p.price,
//             quantity: p.quantity,
//             imageUrl: p.imageUrl, // If imageUrl is not present, this will be undefined as allowed
//           })),
//           estimatedDelivery: new Date(
//             Date.now() + 5 * 24 * 60 * 60 * 1000
//           ).toLocaleDateString(), // Example: 5 days from now
//         });
//       }

//       res.status(201).json({
//         success: true,
//         orderId: order.orderId,
//       });
//     } catch (error) {
//       res.status(400).json({
//         error: error instanceof Error ? error.message : "Order creation failed",
//       });
//     }
//   }
// }

import { Request, Response } from "express";
import Order from "../models/order.model";
import { sendOrderConfirmation } from "../services/email.service";
import { createRazorpayOrder } from "../services/payment.service";

export default class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const { customer, products, paymentMethod, paymentMode } = req.body;

      // Validate required fields
      if (!customer?.email || !products?.length || !paymentMethod) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // If Razorpay is used, validate payment mode
      if (
        paymentMethod !== "cod" &&
        !["upi", "netbanking", "card", "wallet"].includes(paymentMode)
      ) {
        console.log("DEBUG: Invalid payment mode check triggered");
        console.log("DEBUG: paymentMethod =", paymentMethod);
        console.log("DEBUG: paymentMode =", paymentMode);
        console.log("DEBUG: Allowed modes =", [
          "upi",
          "netbanking",
          "card",
          "wallet",
        ]);
        console.log(
          "DEBUG: Mode matches? =",
          ["upi", "netbanking", "card", "wallet"].includes(paymentMode)
        );
        return res.status(400).json({ error: "Invalid payment mode" });
      }

      // Calculate totals
      const subtotal = products.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      const shipping = 50;
      const tax = subtotal * 0.2;
      const total = subtotal + shipping + tax;

      // Create order
      const order = await Order.create({
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        },
        products: products.map((p: any) => ({
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
        await sendOrderConfirmation(order.customer.email, {
          id: order.orderId,
          items: order.products.map((p: any) => ({
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            imageUrl: p.imageUrl,
          })),
          estimatedDelivery: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
        });

        return res.status(201).json({
          success: true,
          orderId: order.orderId,
        });
      }

      // Razorpay orders → create payment order
      const razorpayOrder = await createRazorpayOrder(total);

      if (!razorpayOrder?.id) {
        throw new Error("Razorpay order creation failed");
      }

      return res.status(201).json({
        success: true,
        orderId: order.orderId,
        razorpayOrderId: razorpayOrder.id,
        amount: total,
      });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(400).json({
        error: error instanceof Error ? error.message : "Order creation failed",
      });
    }
  }
}
