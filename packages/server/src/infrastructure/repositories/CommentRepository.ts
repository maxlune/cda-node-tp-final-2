import { db } from "../data";
import { comments, movies, users } from "../data/schema";
import { eq } from "drizzle-orm";

/**
   * Récupère la liste des commentaires
  //  * TODO
  //  * @returns {Comment[]}
   */
export class CommentRepository {
  getAllComments() {
    try {
      return db
        .select({
          id: comments.id,
          content: comments.content,
          movie: {
            id: movies.id,
            title: movies.title,
          },
          author: {
            id: users.id,
            username: users.username,
          },
        })
        .from(comments)
        .leftJoin(users, eq(users.id, comments.author))
        .leftJoin(movies, eq(movies.id, comments.movieId))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer les commentaires");
    }
  }
}
