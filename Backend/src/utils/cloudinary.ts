import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "jewelry-products",
      quality: "auto:best",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error details:", error);
    throw new Error(`Cloudinary upload failed: ${error}`);
  }
};
