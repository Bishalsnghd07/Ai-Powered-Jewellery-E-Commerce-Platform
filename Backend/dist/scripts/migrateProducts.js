"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
const cloudinary_1 = require("../utils/cloudinary");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
// 1. Configure MongoDB Connection
const connectDB = async () => {
    await mongoose_1.default.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
    });
    console.log("🟢 MongoDB Connected");
};
// 2. Get all image files from directory
const getJewelryImages = () => {
    const imagesDir = path_1.default.join(__dirname, "../../../frontend/public/jewelry");
    return fs_1.default
        .readdirSync(imagesDir)
        .filter((file) => [".jpg", ".png", ".webp"].includes(path_1.default.extname(file).toLowerCase()))
        .map((file) => ({
        name: path_1.default.basename(file, path_1.default.extname(file)).replace(/-/g, " "),
        path: path_1.default.join(imagesDir, file),
    }));
};
// 3. Migration Logic
const migrateProducts = async () => {
    await connectDB();
    const jewelryImages = getJewelryImages();
    console.log(`Found ${jewelryImages.length} jewelry images`);
    for (const { name, path: imagePath } of jewelryImages) {
        try {
            console.log(`⬆ Uploading ${name}...`);
            const imageUrl = await (0, cloudinary_1.uploadImage)(imagePath);
            await Product_1.default.create({
                id: path_1.default.basename(imagePath).split(".")[0],
                name: name
                    .split(" ")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" "),
                price: Math.floor(Math.random() * 2000) + 500, // Random price 500-2500
                description: `Beautiful ${name} from our collection`,
                category: name.includes("ring")
                    ? "rings"
                    : name.includes("necklace")
                        ? "necklaces"
                        : "earrings",
                images: [imageUrl],
                materials: ["14K Gold"],
                features: "Handcrafted by master jewelers",
            });
            console.log(`✅ Created product: ${name}`);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`❌ Failed ${name}:`, error.message);
            }
            else {
                console.error(`❌ Failed ${name}:`, error);
            }
        }
    }
};
// 4. Execute with cleanup
migrateProducts()
    .then(() => {
    mongoose_1.default.disconnect();
    console.log("✨ All jewelry migrated!");
    process.exit(0);
})
    .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
});
