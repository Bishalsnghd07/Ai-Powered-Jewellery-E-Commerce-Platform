// repositories/order.repository.ts
import Order from "../models/order.model";
import { IOrder } from "../types/order.types";

export class OrderRepository {
  async createOrder(
    orderData: Omit<IOrder, "orderId" | "status" | "updatedAt">
  ): Promise<IOrder> {
    const order = new Order({
      ...orderData,
      orderId: `ORD-${Date.now()}`,
      status: "processing",
      updatedAt: new Date(), // Explicitly set updatedAt
    });
    const savedOrder = await order.save();
    const plainOrder = savedOrder.toObject();
    // Ensure customer is always defined to match IOrder type
    if (!plainOrder.customer) {
      plainOrder.customer = {
        name: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      };
    }
    return plainOrder as unknown as IOrder;
  }

  async findOrderById(orderId: string): Promise<IOrder | null> {
    return (await Order.findOne({ orderId }).lean()) as IOrder | null;
  }

  async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<IOrder | null> {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status, updatedAt: new Date() },
      { new: true }
    ).lean();
    return updatedOrder as IOrder | null;
  }
}
