import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { CommentService } from "../../../domain/services/CommentService";
import { CustomRequest } from "../../../types/express";

const commentService = new CommentService();

export const getCommentsByMovieId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comments = await commentService.getCommentById(id);
  console.table(comments);
  response(res, { statusCode: 200, data: comments, message: "OK" });
};

export const createComment = async (req: CustomRequest, res: Response) => {
  const { movieId } = req.params;
  const { userId } = req.user;
  console.log(req.user);

  const { content } = req.body;
  await commentService.createComment({ content, movieId, author: userId });
  response(res, { statusCode: 201, message: "Comment created" });
};

export const deleteCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await commentService.deleteCommentById(id);
  response(res, { statusCode: 200, message: "Comment deleted" });
};

export const updateCommentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  await commentService.updateCommentById(id, content);
  response(res, { statusCode: 200, message: "Comment updated" });
};
