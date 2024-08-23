import { Router } from "express";
import CartController from "../controllers/cartController";

const routes = Router();

routes
  .get("/cart", CartController.getCart)
  .post("/cart", CartController.createCart)
  .get("/cart/:userId", CartController.getUserCart)
  .put("/cart/:userId", CartController.updateCard);

export default routes;
