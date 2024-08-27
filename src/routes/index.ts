import express, { Express } from "express";
import product from "./productRoutes";
import user from "./userRoutes";
import auth from "./authRoutes";
import cart from "./cartRoutes";
import wishlist from "./wishlist";

const routes = (app: Express) => {
  app.use(express.json(), auth, product, user, cart, wishlist);
};

export default routes;
