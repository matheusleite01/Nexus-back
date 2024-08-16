import mongoose from "mongoose";
import BadRequest from "./BadRequest";

class ValidationError extends BadRequest {
  constructor(erro: mongoose.Error.ValidationError) {
    const erroMessage = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    super(erroMessage);
  }
}

export default ValidationError;
