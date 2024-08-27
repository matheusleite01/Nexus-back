import { Request, Response, NextFunction } from "express";
import WishlistService from "../service/wishilistService";
import ErrorNotFound from "../errors/ErrorNotFound";

const wishlistService = new WishlistService();

class WishlistController {
  static async createWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const wishList = await wishlistService.createWishlist(req);
      res.status(201).json(wishList);
    } catch (error) {
      next(error);
    }
  }

  static async getAllWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const wishList = await wishlistService.getAllWishlist();
      res.status(200).json(wishList);
    } catch (error) {
      next(error);
    }
  }

  static async getUserWishlist(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const wishList = await wishlistService.getUserWishlist(req);
      if (!wishList) {
        return next(new ErrorNotFound("WishList not found"));
      }
      res.status(200).json(wishList);
    } catch (error) {
      next(error);
    }
  }

  static async updateWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      const updateWishlist = await wishlistService.updateWishlist(req);
      res.status(200).json(updateWishlist);
    } catch (error) {
      next(error);
    }
  }
}

export default WishlistController;
