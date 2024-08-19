import { Product } from "../models/Product";
import { Request, NextFunction } from "express";
import filterSearch from "../utils/filterSearch";

class ProductService {
  async getAllProduct() {
    const products = await Product.find(
      {},
      "name description price image category",
    );

    return products;
  }

  async createProduct(req: Request, next: NextFunction) {
    const productFind = await Product.findOne({ name: req.body.name });

    if (productFind) {
      throw new Error("Product already exists");
    }

    try {
      const product = await Product.create(req.body);
      console.log(product);
      return product;
    } catch (error) {
      next(error);
    }
  }

  async getIdProduct(req: Request, next: NextFunction) {
    const id = req.params.id;

    try {
      const productId = await Product.findById(id);
      return productId;
    } catch (error) {
      next(error);
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

  async getProfuctByFilter(req: Request) {
    try {
      const filter = await filterSearch(req);
      const productFilter = await Product.find(
        filter,
        "name description price image category",
      );
      return productFilter;
    } catch (error) {
      return error;
    }
  }
}

export default ProductService;
