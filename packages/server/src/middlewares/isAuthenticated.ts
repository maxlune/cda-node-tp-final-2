import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import jwt from "jsonwebtoken";

import env from "../config/env";

const { JWT_SECRET } = env;

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return response(res, {
      statusCode: 403,
      message: "No token found",
    });
  }

  try {
    const decodedToken = jwt.verify(accessToken, JWT_SECRET);
    const { userId } = decodedToken as jwt.JwtPayload;
    req.user = { userId };
    next();
  } catch (err) {
    return response(res, {
      statusCode: 401,
      message: "Invalid token",
    });
  }
};
