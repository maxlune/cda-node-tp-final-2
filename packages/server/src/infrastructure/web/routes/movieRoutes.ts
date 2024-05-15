import express from "express";
import { createMovie, getAllMovies } from "../controllers/MovieController";

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);

export default router;
