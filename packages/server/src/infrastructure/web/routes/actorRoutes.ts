import express from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import {
  createActor,
  deleteActorById,
  getActorById,
  updateActorById,
} from "../controllers/ActorController";

const router = express.Router();

router.post("/:movieId", isAuthenticated, createActor);
router.get("/:id", getActorById);
router.delete("/:id", deleteActorById);
router.put("/:id", updateActorById);

export default router;
