import express from "express";
import movieRoutes from "./movieRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

router.use("/movies", movieRoutes);
router.use("/users", userRoutes);

export default router;
