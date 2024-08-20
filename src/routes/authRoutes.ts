import { Router } from "express";
import AuthController from "../controllers/authController";

const routes = Router();

routes.post("/auth/login", AuthController.login);

export default routes;
