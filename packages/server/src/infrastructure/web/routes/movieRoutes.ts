import express from "express";
import { getAllMovies } from "../controllers/MovieController";

const router = express.Router();

router.get("/", getAllMovies);

export default router;
