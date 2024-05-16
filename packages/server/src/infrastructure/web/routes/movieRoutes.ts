import express from "express";
import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../controllers/MovieController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
// TODO Ajouter le isAuthenticated ici
router.post("/", isAuthenticated, createMovie);
router.delete("/:id", isAuthenticated, deleteMovieById);
router.put("/:id", updateMovieById);

export default router;
