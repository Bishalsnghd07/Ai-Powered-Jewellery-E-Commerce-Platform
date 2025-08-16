// src/routes/order.routes.ts
import express from "express";
import OrderController from "../controllers/order.controller";
import { verifyPayment } from "../controllers/payment.controller";

const router = express.Router();

// POST /api/orders
router.post("/", OrderController.createOrder);
router.post("/verify-payment", verifyPayment);

export default router;
