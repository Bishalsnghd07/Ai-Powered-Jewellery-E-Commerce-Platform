"use strict";
// import { Schema, model, Document } from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
// interface IProduct extends Document {
//   id: string; // e.g. "diamond-ring"
//   name: string;
//   price: number;
//   description: string;
//   features: string;
//   includes: { quantity: number; item: string }[];
//   materials: string[];
//   images: string[]; // Cloudinary URLs
//   category: "rings" | "necklaces" | "earrings";
//   tagline?: string;
// }
// const ProductSchema = new Schema<IProduct>(
//   {
//     id: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     features: { type: String, required: true },
//     includes: [
//       {
//         quantity: Number,
//         item: String,
//       },
//     ],
//     materials: [String],
//     images: { type: [String], required: true },
//     category: {
//       type: String,
//       enum: ["rings", "necklaces", "earrings"],
//       required: true,
//     },
//     tagline: String,
//   },
//   { timestamps: true }
// );
// export default model<IProduct>("Product", ProductSchema);
// src/models/Product.ts
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    images: { type: [String], required: true },
    category: {
        type: String,
        enum: ["rings", "necklaces", "earrings"],
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
