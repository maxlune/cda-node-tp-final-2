import { db } from "../data";
import { users } from "../data/schema";
import { User, NewUser, UserColumns } from "../../domain/entities/User";
import { eq } from "drizzle-orm";

export class UserRepository {
  /**
   * Récupère tous les utilisateurs de la base de données.
   * @returns Une promesse résolue avec un tableau contenant tous les utilisateurs.
   * @throws Error si la récupération des utilisateurs échoue.
   */
  public getAllUsers(): Promise<Partial<User>[]> {
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

  /**
   * Récupère un utilisateur par son identifiant.
   * @param id - L'identifiant de l'utilisateur à récupérer.
   * @param columns - Les colonnes de l'utilisateur à récupérer.
   * @returns Une promesse résolue avec les informations de l'utilisateur spécifié, ou undefined si l'utilisateur n'est pas trouvé.
   * @throws Error si la récupération de l'utilisateur échoue.
   */
  public getUserById(
    id: string,
    columns: UserColumns
  ): Promise<Partial<User | undefined>> {
    try {
      return db.query.users.findFirst({
        where: eq(users.id, id),
        columns,
      });
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  }

  /**
   * Récupère un utilisateur par son nom d'utilisateur.
   * @param username - Le nom d'utilisateur de l'utilisateur à récupérer.
   * @param columns - Les colonnes de l'utilisateur à récupérer.
   * @returns Une promesse résolue avec les informations de l'utilisateur spécifié, ou undefined si l'utilisateur n'est pas trouvé.
   * @throws Error si la récupération de l'utilisateur échoue.
   */
  public getUserByUsername(
    username: string,
    columns: UserColumns
  ): Promise<Partial<User | undefined>> {
    try {
      return db.query.users.findFirst({
        where: eq(users.username, username),
        columns,
      });
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  }

  /**
   * Crée un nouvel utilisateur dans la base de données.
   * @param user - Les informations du nouvel utilisateur à créer.
   * @returns Une promesse résolue avec les informations de l'utilisateur créé.
   * @throws Error si la création de l'utilisateur échoue.
   */
  public createUser(user: NewUser) {
    try {
      return db.insert(users).values(user).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer l'utilisateur");
    }
  }

  /**
   * Met à jour les informations d'un utilisateur dans la base de données.
   * @param user - Les nouvelles informations de l'utilisateur à mettre à jour.
   * @returns Une promesse résolue avec les informations de l'utilisateur mises à jour.
   * @throws Error si la mise à jour de l'utilisateur échoue.
   */
  public updateUser(user: User) {
    try {
      return db.update(users).set(user).where(eq(users.id, user.id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  }
}
