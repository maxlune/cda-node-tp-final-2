import express from "express";
import {
  createComment,
  deleteCommentById,
  getCommentsById,
  updateCommentById,
} from "../controllers/CommentController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

const router = express.Router();

router.get("/:id", getCommentsById);
router.post("/:movieId", isAuthenticated, createComment);
router.delete("/:id", deleteCommentById);
router.put("/:id", updateCommentById);

export default router;
