import Product from "../models/Product";
import { uploadImage } from "../utils/cloudinary";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// 1. Configure MongoDB Connection
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    serverSelectionTimeoutMS: 30000,
  });
  console.log("🟢 MongoDB Connected");
};

// 2. Get all image files from directory
const getJewelryImages = () => {
  const imagesDir = path.join(__dirname, "../../../frontend/public/jewelry");
  return fs
    .readdirSync(imagesDir)
    .filter((file) =>
      [".jpg", ".png", ".webp"].includes(path.extname(file).toLowerCase())
    )
    .map((file) => ({
      name: path.basename(file, path.extname(file)).replace(/-/g, " "),
      path: path.join(imagesDir, file),
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
      const imageUrl = await uploadImage(imagePath);

      await Product.create({
        id: path.basename(imagePath).split(".")[0],
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
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Failed ${name}:`, error.message);
      } else {
        console.error(`❌ Failed ${name}:`, error);
      }
    }
  }
};

// 4. Execute with cleanup
migrateProducts()
  .then(() => {
    mongoose.disconnect();
    console.log("✨ All jewelry migrated!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
