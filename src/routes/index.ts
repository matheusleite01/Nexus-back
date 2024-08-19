import express, { Express } from "express";
import product from "./productRoutes";
import user from "./userRoutes";

const routes = (app: Express) => {
  app.route("/").get((req, res) => res.status(200).send("funcionou"));
  app.use(express.json(), product, user);
};

export default routes;
