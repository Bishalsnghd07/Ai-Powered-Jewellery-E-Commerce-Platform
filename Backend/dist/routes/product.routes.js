"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const product_validator_1 = require("../validators/product.validator"); // Optional but recommended
const router = express_1.default.Router();
// GET /api/products?category=rings
router.get("/", product_controller_1.default.getProductsByCategory);
// POST /api/products (with Cloudinary URLs in body)
router.post("/", express_1.default.json(), // Parse JSON body
product_validator_1.validateProductInput, // Optional validation middleware
product_controller_1.default.createProduct);
// GET /api/products/:id
router.get("/:id", product_controller_1.default.getProductById);
exports.default = router;
