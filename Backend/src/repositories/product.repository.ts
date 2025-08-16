import Product, { IProduct } from "../models/Product";

class ProductRepository {
  // Find products by category
  static async findByCategory(category: string): Promise<IProduct[]> {
    return Product.find({ category }).lean().exec();
  }

  // Find product by ID (using your custom 'id' field)
  static async findById(id: string): Promise<IProduct | null> {
    return Product.findOne({ id }).exec();
  }

  // Alternative if using MongoDB's default _id:
  // static async findById(id: string): Promise<IProduct | null> {
  //   return Product.findById(id).exec();
  // }

  // Create new product
  static async create(productData: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(productData);
    return product.save();
  }
}

export default ProductRepository;
