"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    constructor() {
        // Reusable error handler
        this.handleError = (res, error) => {
            console.error("Controller error:", error);
            const message = error instanceof Error ? error.message : "Server error";
            res.status(500).json({ error: message });
        };
    }
    // Existing method
    async getProductsByCategory(req, res) {
        try {
            const { category } = req.query;
            const products = await product_service_1.default.getProductsByCategory(category);
            res.json(products);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    // Add the missing method
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await product_service_1.default.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    // Existing createProduct method
    async createProduct(req, res) {
        try {
            const { images, ...productData } = req.body;
            const product = await product_service_1.default.createProduct({
                ...productData,
                images,
                price: Number(productData.price),
            });
            res.status(201).json(product);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
}
exports.default = new ProductController();
