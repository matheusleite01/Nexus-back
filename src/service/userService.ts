import { Request, NextFunction } from "express";
import { User } from "../models/User";
import { hash } from "bcryptjs";
import ErrorNotFound from "../errors/ErrorNotFound";

class UserService {
  async getAllUsers() {
    const user = await User.find({});
    return user;
  }

  async getUserById(req: Request) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(req: Request, next: NextFunction) {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return next(new ErrorNotFound("User already exists", 400));
    }

    try {
      const hashPassword = await hash(password, 8);
      const user = await User.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      return user;
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const updateUser = await User.findByIdAndUpdate(id, {
        name: name,
        email: email,
      });
      return updateUser;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(req: Request) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
