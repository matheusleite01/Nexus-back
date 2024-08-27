import { Router } from "express";
import WishlistController from "../controllers/wishlistController";

const router = Router();

router
  .get("/wishlist", WishlistController.getAllWishlist)
  .post("/wishlist", WishlistController.createWishlist)
  .get("/wishlist/:userId", WishlistController.getUserWishlist)
  .put("/wishlist/:userId", WishlistController.updateWishlist);

export default router;
