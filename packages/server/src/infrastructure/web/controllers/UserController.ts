import { Request, Response } from "express";
import env from "../../../config/env";
import bcrypt from "bcrypt";

import { UserRepository } from "../../repositories/UserRepository";

import { response } from "../../../utils/response";
import { CustomRequest } from "../../../types/express";
import { AuthService } from "../../../domain/services/AuthService";

const { NODE_ENV } = env;

const userRepo = new UserRepository();
const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await userRepo.getUserByUsername(username, {
      id: true,
      username: true,
      password: true,
    });
    if (!user)
      return response(res, {
        statusCode: 401,
        message: "Authentication failed",
      });

    const isValid = await bcrypt.compare(password, user.password as string);
    if (!isValid)
      return response(res, {
        statusCode: 401,
        message: "Authentication failed",
      });

    const accessToken = authService.issueAccessToken(user.id as string);
    const refreshToken = await authService.issueRefreshToken(user.id as string);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
    });

    response(res, { statusCode: 200, message: "Authentication successful" });
  } catch (error) {
    console.error(error);
    response(res, { statusCode: 500, message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    if (!username?.trim() || !password?.trim())
      return response(res, {
        statusCode: 400,
        message: "Invalid username or password",
      });

    const existingUsername = await userRepo.getUserByUsername(username, {
      username: true,
    });
    if (existingUsername)
      return response(res, {
        statusCode: 409,
        message: "Username already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    userRepo.createUser({ username, password: hashedPassword });
    response(res, { statusCode: 201, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    response(res, { statusCode: 500, message: "Internal server error" });
  }
};

export const me = async (req: CustomRequest, res: Response) => {
  try {
    response(res, { statusCode: 200, message: "OK", data: req.user });
  } catch (error) {
    console.error(error);
    response(res, { statusCode: 500, message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    response(res, { statusCode: 200, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    response(res, { statusCode: 500, message: "Internal server error" });
  }
};