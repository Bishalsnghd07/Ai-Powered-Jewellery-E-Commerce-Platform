"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductInput = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().positive().required(),
    images: joi_1.default.array().items(joi_1.default.string().uri()).min(1).required(),
    category: joi_1.default.string().valid("rings", "necklaces", "earrings").required(),
});
const validateProductInput = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateProductInput = validateProductInput;
