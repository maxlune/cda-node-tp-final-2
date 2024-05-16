import express from "express";
import {
  createRating,
  deleteRatingById,
  getRatingById,
  updateRatingById,
} from "../controllers/RatingController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

const router = express.Router();

router.get("/:id", getRatingById);
router.post("/:movieId", isAuthenticated, createRating);
router.delete("/:id", deleteRatingById);
router.put("/:id", updateRatingById);

export default router;
