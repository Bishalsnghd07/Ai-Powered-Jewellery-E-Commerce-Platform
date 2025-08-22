"use strict";
// import ProductRepository from "../repositories/product.repository";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Add TypeScript interface for product creation
// interface CreateProductData {
//   name: string;
//   price: number;
//   images: string[];
//   category: "rings" | "necklaces" | "earrings";
//   description?: string;
//   features?: string;
//   // Include other product fields as needed
// }
// class ProductService {
//   // Existing method
//   static async getProductsByCategory(category: string) {
//     if (!["rings", "necklaces", "earrings"].includes(category)) {
//       throw new Error("Invalid category");
//     }
//     return ProductRepository.findByCategory(category);
//   }
//   // New method for product creation
//   static async createProduct(data: CreateProductData) {
//     // Validate price
//     if (data.price <= 0) {
//       throw new Error("Price must be greater than 0");
//     }
//     // Validate at least one image
//     if (!data.images || data.images.length === 0) {
//       throw new Error("At least one image is required");
//     }
//     return ProductRepository.create(data);
//   }
// }
// export default ProductService;
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
class ProductService {
    // Get products by category
    static async getProductsByCategory(category) {
        if (!["rings", "necklaces", "earrings"].includes(category)) {
            throw new Error("Invalid category");
        }
        return product_repository_1.default.findByCategory(category);
    }
    // Get single product by ID
    static async getProductById(id) {
        return product_repository_1.default.findById(id);
    }
    // Create product
    static async createProduct(productData) {
        // Validate required fields
        if (!productData.images || productData.images.length === 0) {
            throw new Error("At least one image is required");
        }
        if (!productData.price || Number(productData.price) <= 0) {
            throw new Error("Price must be greater than 0");
        }
        return product_repository_1.default.create(productData);
    }
}
exports.default = ProductService;
