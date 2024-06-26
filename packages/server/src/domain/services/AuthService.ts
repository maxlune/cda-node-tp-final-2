import jwt from "jsonwebtoken";
import env from "../../config/env";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { User } from "../entities/User";

const { REFRESH_SECRET, JWT_SECRET } = env;

export class AuthService {
  private refreshTokenStore: Map<string, string> = new Map();
  private UserRepository = new UserRepository();

  public issueAccessToken(id: string): string {
    return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "15m" });
  }

  public async issueRefreshToken(id: string): Promise<string> {
    const refreshToken = jwt.sign({ userId: id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });
    const user = await this.UserRepository.getUserById(id, {
      id: true,
      refreshToken: true,
    });
    if (user) {
      this.UserRepository.updateUser({
        ...user,
        refreshToken: refreshToken,
      } as User);
    }

    return refreshToken;
  }

  public async refreshAccessToken(
    refreshToken: string
  ): Promise<string | void> {
    try {
      const payload = jwt.verify(
        refreshToken,
        REFRESH_SECRET
      ) as jwt.JwtPayload;
      const user = await this.UserRepository.getUserById(payload.userId, {
        id: true,
        refreshToken: true,
      });

      if (user && user.refreshToken === refreshToken) {
        return this.issueAccessToken(payload.userId);
      }

      const storedRefreshToken = this.refreshTokenStore.get(payload.userId);

      if (storedRefreshToken === refreshToken) {
        const newAccessToken = this.issueAccessToken(payload.userId);
        return newAccessToken;
      } else {
        if (user) {
          user.refreshToken = "";
          this.UserRepository.updateUser(user as User);
        }

        throw new Error("Invalid refresh token");
      }
    } catch (err) {
      console.error(err);

      throw new Error("Invalid refresh token");
    }
  }
}
