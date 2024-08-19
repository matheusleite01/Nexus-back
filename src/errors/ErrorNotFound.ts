import ErroBase from "./ErroBase";

class ErrorNotFound extends ErroBase {
  constructor(message = "Error Page", code = 400) {
    super(message, code);
  }
}

export default ErrorNotFound;
