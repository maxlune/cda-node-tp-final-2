import express from "express";
import {
  createGenre,
  deleteGenreById,
  getGenreById,
  updateGenreById,
} from "../controllers/GenreController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

const router = express.Router();

router.post("/:movieId", isAuthenticated, createGenre);
router.get("/:id", getGenreById);
router.delete("/:id", deleteGenreById);
router.put("/:id", updateGenreById);

export default router;
