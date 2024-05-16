import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import env from "./config/env";
import cors from "cors";
import router from "./infrastructure/web/routes";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

const { PORT, FRONTEND_URL } = env;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(helmet());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
