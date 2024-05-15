import express from "express";
import movieRoutes from "./movieRoutes";
import userRoutes from "./userRoutes";
import commentRoutes from "./commentRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/comments", commentRoutes);

export default router;
