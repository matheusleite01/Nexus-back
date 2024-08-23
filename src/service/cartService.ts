import { Cart } from "../models/Cart";
import { Request } from "express";
import { Product } from "../models/Product";
import ErrorNotFound from "../errors/ErrorNotFound";

class CartService {
  async getAllCart() {
    const cart = await Cart.find({});

    return cart;
  }

  async createCart(req: Request) {
    const { userId, productId } = req.body;
    const cartProduct = await Cart.findOne({ userId: userId });

    if (cartProduct) {
      const indexProduct = cartProduct.data.some(
        (item) => item.productId.toString() === productId,
      );

      if (indexProduct) {
        throw new ErrorNotFound("productId already exists");
      }
      const product = await Product.findOne({ _id: productId });
      cartProduct.data.push({
        productId,
        name: product?.name,
        image: product?.image,
        ageRating: product?.ageRating,
        price: product?.price,
        platform: product?.platforms,
      });
      const totalPrice = cartProduct.data.reduce(
        (acu, item) => (item?.price as number) + acu,
        0,
      );
      cartProduct.totalPrice = totalPrice;
      await cartProduct.save();
      return cartProduct;
    }

    try {
      const product = await Product.findOne({ _id: productId });
      const cart = await Cart.create({
        userId,
        data: [
          {
            productId,
            name: product?.name,
            image: product?.image,
            ageRating: product?.ageRating,
            price: product?.price,
            platform: product?.platforms,
          },
        ],
        totalPrice: product?.price,
      });
      return cart;
    } catch (error) {
      return error;
    }
  }

  async getUserCart(req: Request) {
    const { userId } = req.params;

    try {
      const cart = await Cart.findOne({ userId: userId });
      return cart;
    } catch (error) {
      return error;
    }
  }

  async updateCart(req: Request) {
    const { userId } = req.params;
    const { productId } = req.body;
    const cartUser = await Cart.findOne({ userId: userId });

    if (!cartUser) {
      throw new ErrorNotFound("Cart not exists");
    }

    try {
      const productCart = cartUser.data.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (productCart === -1) {
        throw new ErrorNotFound("Product not found in cart");
      }

      if (cartUser.data.length === 1) {
        await Cart.findOneAndDelete({ userId: userId });
        return { message: "Cart deleted" };
      }

      cartUser.data.splice(productCart, 1);
      const totalPrice = cartUser.data.reduce(
        (acu, item) => (item?.price as number) + acu,
        0,
      );
      cartUser.totalPrice = totalPrice;
      await cartUser.save();
      return { message: "Product removed", cart: cartUser };
    } catch (error) {
      return error;
    }
  }
}

export default CartService;
