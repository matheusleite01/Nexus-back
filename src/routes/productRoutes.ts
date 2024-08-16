import { Router } from "express";
import ProductController from "../controllers/productController";

const routes = Router();

routes
  .get("/products", ProductController.getAllProducts)
  .get("/products/:id", ProductController.getProductById)
  .post("/products", ProductController.createProduct)
  .put("/products/:id", ProductController.UpdateProduct)
  .delete("/products/:id", ProductController.deleteProduct);

export default routes;
