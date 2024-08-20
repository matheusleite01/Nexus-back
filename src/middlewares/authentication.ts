import { Request, Response, NextFunction } from "express";
import { verify, decode } from "jsonwebtoken";

interface UserRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export default async function authentification(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Access Token not found" });
  }

  const [, accessToken] = token.split(" ");
  const secret = process.env.JWT_SECRET as string;

  try {
    verify(accessToken, secret);
    const { id, email } = (await decode(accessToken)) as {
      id: string;
      email: string;
    };

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(401).send({ message: "User not authorized" });
  }
}
