import { Product } from "../models/Product";
import { Request } from "express";

class ProductService {
  async getAllProduct() {
    const products = await Product.find({}, 'name description price image category');

    return products;
  }

  async createProduct(req: Request) {
    const productFind = await Product.findOne({ name: req.body.name });

    if (productFind) {
      throw new Error("Product already exists");
    }

    try {
      const product = await Product.create(req.body);
      return product;
    } catch (error) {
      return error;
    }
  }

  async getIdProduct(req: Request) {
    const id = req.params.id;

    try {
      const productId = await Product.findById(id);
      return productId;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(req: Request) {
    const id = req.params.id;

    try {
      const updateProduct = await Product.findByIdAndUpdate(id, req.body);
      return updateProduct;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(req: Request) {
    const id = req.params.id;

    try {
      const deleteProduct = await Product.findByIdAndDelete(id);
      return deleteProduct;
    } catch (error) {
      return error;
    }
  }
}

export default ProductService;
