import express from "express";
import routes from "./routes";
import connectDatabase from "./db/dbConfig";
import errorHandler from "./middlewares/errorHandler";
import page404 from "./middlewares/page404";

connectDatabase();

const app = express();
routes(app);
app.use(page404);

app.use(errorHandler);

export default app;
