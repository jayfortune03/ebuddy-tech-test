import { Router } from "express";
import authRouter from "./auth.routes";
import { authMiddleware } from "../middleware/auth";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/auth", authRouter);

routes.use(authMiddleware);
routes.use("/user", userRouter);

export default routes;
