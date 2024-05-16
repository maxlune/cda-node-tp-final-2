import express from "express";
import movieRoutes from "./movieRoutes";
import userRoutes from "./userRoutes";
import commentRoutes from "./commentRoutes";
import ratingRoutes from "./ratingRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/comments", commentRoutes);
router.use("/ratings", ratingRoutes);

export default router;
