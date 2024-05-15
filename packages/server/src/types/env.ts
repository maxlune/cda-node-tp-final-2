export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  FRONTEND_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
}
