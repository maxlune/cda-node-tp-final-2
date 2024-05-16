import express from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import {
  createFavorite,
  deleteFavoriteById,
  getFavoriteById,
  updateFavoriteById,
} from "../controllers/FavoriteController";

const router = express.Router();

router.post("/:movieId", isAuthenticated, createFavorite);
router.get("/:id", getFavoriteById);
router.delete("/:id", deleteFavoriteById);
router.put("/:id", updateFavoriteById);

export default router;
