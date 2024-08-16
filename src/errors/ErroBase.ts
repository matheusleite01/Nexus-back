import { Response } from "express";

class ErroBase extends Error {
  message: string;
  status: number;
  constructor(message = "Internal Server Error", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  sendReply(res: Response) {
    res
      .status(this.status)
      .send({ message: this.message, status: this.status });
  }
}

export default ErroBase;
