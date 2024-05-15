import { EnvConfig } from "../types/env";

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || "3000"),
  // TODO
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/blog",
};

export default env;
