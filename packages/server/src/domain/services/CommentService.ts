import { CommentRepository } from "../../infrastructure/repositories/CommentRepository";
import { NewComment } from "../entities/Comment";

export class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  getCommentById(id: string) {
    if (!id || id.trim().length < 1) return;
    return this.commentRepository.getCommentById(id);
  }

  createComment(comment: NewComment) {
    if (!comment || comment.content.trim().length < 1) return;
    return this.commentRepository.createComment(comment);
  }
}
