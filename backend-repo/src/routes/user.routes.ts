import { Router } from "express";
import { createUser, listUsers, login, logout } from "../controller/api";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/users", authMiddleware, createUser);
router.get("/users", authMiddleware, listUsers);
router.post("/login", login);
router.post("/logout", logout);

export default router;
