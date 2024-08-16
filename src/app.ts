import express from "express";
import routes from "./routes";
import connectDatabase from "./db/dbConfig";

connectDatabase();

const app = express();
routes(app);


export default app;
