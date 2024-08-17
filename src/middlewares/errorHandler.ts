import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase";
import BadRequest from "../errors/BadRequest";
import ValidationError from "../errors/ValidationError";
import ErrorNotFound from "../errors/ErrorNotFound";

function errorHandler(
  erro: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (erro instanceof mongoose.Error.CastError) {
    new BadRequest().sendReply(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendReply(res);
  } else if (erro instanceof ErrorNotFound) {
    erro.sendReply(res);
  } else {
    new ErroBase().sendReply(res);
  }
}

export default errorHandler;
