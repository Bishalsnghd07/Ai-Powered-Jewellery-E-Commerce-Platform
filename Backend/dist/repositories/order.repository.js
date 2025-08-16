"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
// repositories/order.repository.ts
const order_model_1 = __importDefault(require("../models/order.model"));
class OrderRepository {
    async createOrder(orderData) {
        const order = new order_model_1.default({
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
        return plainOrder;
    }
    async findOrderById(orderId) {
        return (await order_model_1.default.findOne({ orderId }).lean());
    }
    async updateOrderStatus(orderId, status) {
        const updatedOrder = await order_model_1.default.findOneAndUpdate({ orderId }, { status, updatedAt: new Date() }, { new: true }).lean();
        return updatedOrder;
    }
}
exports.OrderRepository = OrderRepository;
