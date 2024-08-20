import { Request, Response, NextFunction } from "express";
import AuthService from "../service/authService";

const authService = new AuthService();

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const login = await authService.login(req);
      return res.status(200).send({
        message: "Login successfully",
        token: login,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
