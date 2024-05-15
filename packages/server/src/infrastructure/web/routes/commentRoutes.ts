import express from "express";
import {
  createComment,
  getCommentsByMovieId,
} from "../controllers/CommentController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

const router = express.Router();

router.get("/:id", getCommentsByMovieId);
router.post("/:movieId", isAuthenticated, createComment);

export default router;
