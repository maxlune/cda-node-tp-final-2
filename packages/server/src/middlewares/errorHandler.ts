import { NextFunction, Response, Request } from "express";
import { response } from "../utils/response";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  return response(res, { statusCode: 500, message: "Internal Server Error" });
};
