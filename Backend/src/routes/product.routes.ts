import express from "express";
import ProductController from "../controllers/product.controller";
import { validateProductInput } from "../validators/product.validator"; // Optional but recommended

const router = express.Router();

// GET /api/products?category=rings
router.get("/", ProductController.getProductsByCategory);

// POST /api/products (with Cloudinary URLs in body)
router.post(
  "/",
  express.json(), // Parse JSON body
  validateProductInput, // Optional validation middleware
  ProductController.createProduct
);

// GET /api/products/:id
router.get("/:id", ProductController.getProductById);

export default router;
