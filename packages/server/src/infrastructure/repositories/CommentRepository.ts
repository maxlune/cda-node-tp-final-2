import { NewComment } from "../../domain/entities/Comment";
import { db } from "../data";
import { comments, movies, users } from "../data/schema";
import { eq } from "drizzle-orm";

export class CommentRepository {
  public getCommentById(id: string) {
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

  public createComment(comment: NewComment) {
    try {
      return db.insert(comments).values(comment).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer le commentaire");
    }
  }

  public deleteCommentById(id: string) {
    try {
      return db.delete(comments).where(eq(comments.id, id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le commentaire");
    }
  }

  public updateCommentById(id: string, content: string) {
    try {
      return db
        .update(comments)
        .set({
          content,
        })
        .where(eq(comments.id, id))
        .returning();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de supprimer le commentaire");
    }
  }
}
