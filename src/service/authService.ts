import { Request } from "express";
import { User } from "../models/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import ErrorNotFound from "../errors/ErrorNotFound";

class AuthService {
  async login(req: Request) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new ErrorNotFound("User is not registered", 404);
    }

    const passwordCompare = await compare(password, user.password as string);

    if (!passwordCompare) {
      throw new ErrorNotFound("Password incorrect", 404);
    }

    const secret = process.env.JWT_SECRET as string;
    const token = sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      secret,
      { expiresIn: 86400 },
    );

    return token;
  }
}

export default AuthService;
