import { Request, Response, NextFunction } from "express";
import CartService from "../service/cartService";
import ErrorNotFound from "../errors/ErrorNotFound";

const cartService = new CartService();
class CartController {
  static async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.getAllCart();
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await cartService.createCart(req);
      res.status(201).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async getUserCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartId = await cartService.getUserCart(req);
      if (!cartId) {
        return next(new ErrorNotFound("Cart not found"));
      }
      res.status(200).json(cartId);
    } catch (error) {
      next(error);
    }
  }

  static async updateCard(req: Request, res: Response, next: NextFunction) {
    try {
      const cartUpdate = await cartService.updateCart(req);
      res.status(200).json(cartUpdate);
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
