import ProductService from "../service/productService";
import { Request, Response } from "express";

const productService = new ProductService();

class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    const products = await productService.getAllProduct();
    res.status(200).send(products);
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const createProduct = await productService.createProduct(req);
      res.status(201).json({
        message: "Product created successfully",
        data: createProduct,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const productId = await productService.getIdProduct(req);
      if (productId === null) {
        return res.status(200).json({ message: "Product not found" });
      }
      res.status(200).json(productId);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }

  static async UpdateProduct(req: Request, res: Response) {
    try {
      const updateProduct = await productService.updateProduct(req);
      if (updateProduct === null) {
        return res.status(200).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product Updates Successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const deleteProduct = await productService.deleteProduct(req);
      if (deleteProduct === null) {
        return res.status(200).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    }
  }
}

export default ProductController;
