import express from "express";
import { login, logout, me, register } from "../controllers/UserController";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, me);

export default router;
