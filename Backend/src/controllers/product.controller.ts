import { Request, Response } from "express";
import ProductService from "../services/product.service";

class ProductController {
  // Existing method
  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { category } = req.query;
      const products = await ProductService.getProductsByCategory(
        category as string
      );
      res.json(products);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Add the missing method
  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Existing createProduct method
  async createProduct(req: Request, res: Response) {
    try {
      const { images, ...productData } = req.body;
      const product = await ProductService.createProduct({
        ...productData,
        images,
        price: Number(productData.price),
      });
      res.status(201).json(product);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Reusable error handler
  private handleError = (res: Response, error: unknown) => {
    console.error("Controller error:", error);
    const message = error instanceof Error ? error.message : "Server error";
    res.status(500).json({ error: message });
  };
}

export default new ProductController();
