import express from "express";
import movieRoutes from "./movieRoutes";
import userRoutes from "./userRoutes";
import commentRoutes from "./commentRoutes";
import ratingRoutes from "./ratingRoutes";
import genreRoutes from "./genreRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/comments", commentRoutes);
router.use("/ratings", ratingRoutes);
router.use("/genres", genreRoutes);

export default router;
