import { Request, Response } from "express";
import { User } from "../entities/user";
import {
  getUsersService,
  updateUserService,
} from "../repository/userCollection";
import { AppError } from "../utils/errorHandler";

export const updateUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  const { id } = req.params;

  if (!user) throw new AppError("User request needed!", 403);
  try {
    await updateUserService(id || "", {
      ...user,
      totalScore:
        user.totalAverageWeightRatings * 1000000 +
        user.numberOfRents * 1000 +
        user.recentlyActive,
    });
    res
      .status(200)
      .json({ success: true, message: "Success update user data" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const { page = 0, rowsPerPage = 5 } = req.query;

    const { users, totalUsers } = await getUsersService({
      page: Number(page),
      rowsPerPage: Number(rowsPerPage),
    });
    res.status(200).json({
      success: true,
      message: "Success get list users",
      data: { users, totalUsers },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
