"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Enhanced CORS configuration
app.use((0, cors_1.default)({
    origin: [
        "https://ai-powered-jewellery-e-commerce-pla.vercel.app",
        "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// HTTP request logging
app.use((0, morgan_1.default)("dev"));
// Connect to MongoDB
(0, db_1.default)();
// Routes
app.use("/api/products", product_routes_1.default);
app.use("/api/orders", order_routes_1.default);
// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});
// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`➡️ API: http://localhost:${PORT}/api/products`);
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});
