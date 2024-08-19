import { Router } from "express";
import UserController from "../controllers/userController";

const routes = Router();

routes
  .get("/user", UserController.getAllUser)
  .get("/user/:id", UserController.getUserById)
  .post("/user", UserController.createUser)
  .put("/user/:id", UserController.updateUser)
  .delete("/user/:id", UserController.deleteUser);

export default routes;
