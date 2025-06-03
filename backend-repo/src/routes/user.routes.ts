import { Router } from "express";
import { createUser, listUsers } from "../controller/api";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/users", authMiddleware, createUser);
router.get("/users", authMiddleware, listUsers);

export default router;
