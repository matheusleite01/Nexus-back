import { Request, Response, NextFunction } from "express";
import UserService from "../service/userService";
import ErrorNotFound from "../errors/ErrorNotFound";

const userService = new UserService();

class UserController {
  static async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getAllUsers();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req);
      if (user === null) {
        return next(new ErrorNotFound("User not found", 400));
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUser = await userService.createUser(req, next);
      res.status(201).json({
        message: "User created successfully",
        data: createUser,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updateUser = await userService.updateUser(req);
      if (updateUser === null) {
        return next(new ErrorNotFound("User not found", 400));
      }
      res.status(200).json({ message: "User Update Successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteUser = await userService.deleteUser(req);
      if (deleteUser === null) {
        return next(new ErrorNotFound("User not found", 400));
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
