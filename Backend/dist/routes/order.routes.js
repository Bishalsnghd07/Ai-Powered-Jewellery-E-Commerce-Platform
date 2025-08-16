"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/order.routes.ts
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.default.Router();
// POST /api/orders
router.post("/", order_controller_1.default.createOrder);
router.post("/verify-payment", payment_controller_1.verifyPayment);
exports.default = router;
