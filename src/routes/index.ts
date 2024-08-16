import express, { Express } from "express";
import product from "./productRoutes";

const routes = (app: Express) => {
  app.route("/").get((req, res) => res.status(200).send("funcionou"));
  app.use(express.json(), product);
};

export default routes;
