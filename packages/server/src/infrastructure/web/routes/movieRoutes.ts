import express from "express";
import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../controllers/MovieController";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
// TODO Ajouter le isAuthenticated ici
router.post("/", createMovie);
router.delete("/:id", deleteMovieById);
router.put("/:id", updateMovieById);

export default router;
