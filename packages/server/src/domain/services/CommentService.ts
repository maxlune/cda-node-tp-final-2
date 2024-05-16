import { CommentRepository } from "../../infrastructure/repositories/CommentRepository";
import { NewComment } from "../entities/Comment";

export class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  public getCommentById(id: string) {
    if (!id || id.trim().length < 5) return;
    return this.commentRepository.getCommentById(id);
  }

  public createComment(comment: NewComment) {
    if (!comment || comment.content.trim().length < 1) return;
    return this.commentRepository.createComment(comment);
  }

  public deleteCommentById(id: string) {
    if (!id) return;
    return this.commentRepository.deleteCommentById(id);
  }

  public updateCommentById(id: string, content: string) {
    if (!id) return;
    return this.commentRepository.updateCommentById(id, content);
  }
}
