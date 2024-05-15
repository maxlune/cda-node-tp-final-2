import { NewComment } from "../../domain/entities/Comment";
import { db } from "../data";
import { comments, movies, users } from "../data/schema";
import { eq } from "drizzle-orm";

export class CommentRepository {
  getCommentById(id: string) {
    try {
      return db
        .select({
          id: comments.id,
          content: comments.content,
          date: comments.date,
          author: {
            id: users.id,
            username: users.username,
          },
        })
        .from(comments)
        .leftJoin(users, eq(users.id, comments.author))
        .where(eq(comments.id, id))
        .execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de récupérer le commentaire");
    }
  }

  createComment(comment: NewComment) {
    try {
      return db.insert(comments).values(comment).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le commentaire");
    }
  }
}
