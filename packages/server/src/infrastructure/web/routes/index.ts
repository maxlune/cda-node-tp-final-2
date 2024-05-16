import express from "express";
import movieRoutes from "./movieRoutes";
import userRoutes from "./userRoutes";
import commentRoutes from "./commentRoutes";
import ratingRoutes from "./ratingRoutes";
import genreRoutes from "./genreRoutes";
import favoriteRoutes from "./favoriteRoutes";
import actorRoutes from "./actorRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/comments", commentRoutes);
router.use("/ratings", ratingRoutes);
router.use("/genres", genreRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/actors", actorRoutes);

export default router;
