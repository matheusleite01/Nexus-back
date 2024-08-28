import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../swagger.json";

const router = express();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
