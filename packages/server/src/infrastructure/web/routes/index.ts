import express from "express";
import movieRoutes from "./movieRoutes";

const router = express.Router();

router.use("/movies", movieRoutes);

export default router;
