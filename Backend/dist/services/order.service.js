"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
// services/order.service.ts
const order_repository_1 = require("../repositories/order.repository");
class OrderService {
    constructor() {
        this.orderRepository = new order_repository_1.OrderRepository();
    }
    async createOrder(orderData) {
        // Validate order data
        if (!orderData.customer ||
            !orderData.products ||
            orderData.products.length === 0) {
            throw new Error("Invalid order data");
        }
        // Additional business logic
        if (orderData.total <= 0) {
            throw new Error("Order total must be greater than 0");
        }
        const fullOrderData = {
            ...orderData,
            orderId: `ORD-${Date.now()}`,
            status: "processing",
        };
        return await this.orderRepository.createOrder(fullOrderData);
    }
    async getOrderDetails(orderId) {
        const order = await this.orderRepository.findOrderById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
    async updateOrderStatus(orderId, status) {
        const validStatuses = ["processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status");
        }
        const updatedOrder = await this.orderRepository.updateOrderStatus(orderId, status);
        if (!updatedOrder) {
            throw new Error("Order update failed");
        }
        // Could add notification logic here
        return updatedOrder;
    }
}
exports.OrderService = OrderService;
