import ErroBase from "./ErroBase";

class ErrorNotFound extends ErroBase {
  constructor(message = "Error Page") {
    super(message, 404);
  }
}

export default ErrorNotFound;
