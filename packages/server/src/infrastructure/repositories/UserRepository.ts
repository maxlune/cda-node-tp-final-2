import { db } from "../data";
import { users } from "../data/schema";
import { User, NewUser, UserColumns } from "../../domain/entities/User";
import { eq } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des utilisateurs
 * @returns {User[]} - Un tableau contenant tous les utilisateurs
 */
export class UserRepository {
  /**
   * Récupère tous les utilisateurs
   */
  getAllUsers(): Promise<Partial<User>[]> {
    try {
      return db.query.users.findMany({
        columns: {
          id: true,
          username: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  }
}
