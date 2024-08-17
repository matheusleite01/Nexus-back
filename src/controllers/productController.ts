import ErrorNotFound from "../errors/ErrorNotFound";
import ProductService from "../service/productService";
import { Request, Response, NextFunction } from "express";

const productService = new ProductService();

class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    const products = await productService.getAllProduct();
    res.status(200).send(products);
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const createProduct = await productService.createProduct(req, next);
      res.status(201).json({
        message: "Product created successfully",
        data: createProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = await productService.getIdProduct(req, next);
      if (productId === null) {
        return next(new ErrorNotFound("Product not found"));
      }
      res.status(200).json(productId);
    } catch (error) {
      next(error);
    }
  }

  static async UpdateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const updateProduct = await productService.updateProduct(req);
      if (updateProduct === null) {
        return next(new ErrorNotFound("Product not found"));
      }
      res.status(200).json({ message: "Product Updates Successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteProduct = await productService.deleteProduct(req);
      if (deleteProduct === null) {
        return next(new ErrorNotFound("Product not found"));
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
