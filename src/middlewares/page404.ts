import { Request, Response, NextFunction } from "express";
import ErrorPage from "../errors/ErrorNotFound";
function page404(req: Request, res: Response, next: NextFunction) {
  const error404 = new ErrorPage();
  next(error404);
}

export default page404;
