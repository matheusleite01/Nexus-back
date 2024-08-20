import { Router } from "express";
import UserController from "../controllers/userController";
import authentification from "../middlewares/authentication";

const routes = Router();

routes.post("/user", UserController.createUser);

routes.use(authentification);

routes
  .get("/user", UserController.getAllUser)
  .get("/user/:id", UserController.getUserById)
  .put("/user/:id", UserController.updateUser)
  .delete("/user/:id", UserController.deleteUser);

export default routes;
