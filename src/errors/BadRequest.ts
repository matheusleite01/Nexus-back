import ErroBase from "./ErroBase";

class BadRequest extends ErroBase {
  message: string;
  constructor(message = "Bad Reequest") {
    super(message, 400);
    this.message = message;
  }
}

export default BadRequest;
