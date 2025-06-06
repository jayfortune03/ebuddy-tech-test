import { Router } from "express";
import { listUsers, updateUser } from "../controller/users.controller";

const userRouter = Router();

userRouter.put("/update-user-data/:id", updateUser);
userRouter.get("/fetch-user-data", listUsers);

export default userRouter;
