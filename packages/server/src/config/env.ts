import { EnvConfig } from "../types/env";

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || "3000"),
  // TODO
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development",
  JWT_SECRET: process.env.JWT_SECRET || "B1gJwT!$aùs",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "B1gJwT!$aùs$3!sql$!s",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://maximilien:admin@localhost:5432/cinema",
};

export default env;
