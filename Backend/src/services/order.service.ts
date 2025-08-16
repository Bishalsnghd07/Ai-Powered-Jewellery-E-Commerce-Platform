// services/order.service.ts
import { OrderRepository } from "../repositories/order.repository";
import { IOrder } from "../types/order.types";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(
    orderData: Omit<IOrder, "orderId" | "status">
  ): Promise<IOrder> {
    // Validate order data
    if (
      !orderData.customer ||
      !orderData.products ||
      orderData.products.length === 0
    ) {
      throw new Error("Invalid order data");
    }

    // Additional business logic
    if (orderData.total <= 0) {
      throw new Error("Order total must be greater than 0");
    }

    const fullOrderData: IOrder = {
      ...orderData,
      orderId: `ORD-${Date.now()}`,
      status: "processing",
    };
    return await this.orderRepository.createOrder(fullOrderData);
  }

  async getOrderDetails(orderId: string): Promise<IOrder> {
    const order = await this.orderRepository.findOrderById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<IOrder> {
    const validStatuses = ["processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    const updatedOrder = await this.orderRepository.updateOrderStatus(
      orderId,
      status
    );
    if (!updatedOrder) {
      throw new Error("Order update failed");
    }

    // Could add notification logic here
    return updatedOrder;
  }
}
