import { Request } from "express";
import { Product } from "../models/Product";
import { Wishlist } from "../models/Wishlist";
import ErrorNotFound from "../errors/ErrorNotFound";
import { User } from "../models/User";

class WishlistService {
  async createWishlist(req: Request) {
    const { userId, productId } = req.body;
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: productId });

    if (!user) {
      throw new ErrorNotFound("User not found");
    }

    if (!product) {
      throw new ErrorNotFound("Product not found");
    }

    try {
      const wishlistUser = await Wishlist.findOne({ userId: userId });

      if (wishlistUser) {
        const indexProduct = wishlistUser.data.some(
          (item) => item.productId.toString() === productId,
        );

        if (indexProduct) {
          throw new ErrorNotFound("productId already exists");
        }
        wishlistUser.data.push({
          productId,
          name: product?.name,
          image: product?.image,
          ageRating: product?.ageRating,
          category: product?.category,
          platform: product?.platforms,
        });
        await wishlistUser.save();
        return wishlistUser;
      } else {
        const wishlist = await Wishlist.create({
          userId,
          data: [
            {
              productId: product?._id,
              name: product?.name,
              image: product?.image,
              ageRating: product?.ageRating,
              category: product?.category,
              platform: product?.platforms,
            },
          ],
        });
        return wishlist;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      return error;
    }
  }

  async getAllWishlist() {
    const wishlist = await Wishlist.find({});
    return wishlist;
  }

  async getUserWishlist(req: Request) {
    const { userId } = req.params;
    try {
      const user = await Wishlist.findOne({ userId: userId });
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateWishlist(req: Request) {
    const { userId } = req.params;
    const { productId } = req.body;
    const userWishlist = await Wishlist.findOne({ userId: userId });

    if (!userWishlist) {
      throw new ErrorNotFound("Wishlist not exists");
    }

    try {
      const wishlistIndex = userWishlist.data.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (wishlistIndex === -1) {
        throw new ErrorNotFound("Product not found");
      }

      if (userWishlist.data.length === 1) {
        await Wishlist.findOneAndDelete({ userId: userId });
        return { message: "Wishlist deleted" };
      }

      userWishlist.data.splice(wishlistIndex, 1);
      await userWishlist.save();
      return { message: "Product removed", data: userWishlist };
    } catch (error) {
      return error;
    }
  }
}

export default WishlistService;
