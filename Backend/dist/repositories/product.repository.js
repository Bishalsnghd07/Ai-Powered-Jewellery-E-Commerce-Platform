"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
class ProductRepository {
    // Find products by category
    static async findByCategory(category) {
        return Product_1.default.find({ category }).lean().exec();
    }
    // Find product by ID (using your custom 'id' field)
    static async findById(id) {
        return Product_1.default.findOne({ id }).exec();
    }
    // Alternative if using MongoDB's default _id:
    // static async findById(id: string): Promise<IProduct | null> {
    //   return Product.findById(id).exec();
    // }
    // Create new product
    static async create(productData) {
        const product = new Product_1.default(productData);
        return product.save();
    }
}
exports.default = ProductRepository;
