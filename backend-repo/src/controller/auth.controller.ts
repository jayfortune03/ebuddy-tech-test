import { NextFunction, Request, Response } from "express";
import {
  getUserByUserNameService,
  updateUserService,
} from "../repository/userCollection";
import { AppError } from "../utils/errorHandler";
import { checkHash } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/cookieOptions";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;
    const user = await getUserByUserNameService(userName);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!checkHash(password, user.passwordHash)) {
      throw new AppError("Incorrect password or Username", 401);
    }

    const payload = {
      id: user.id,
      name: user.name,
      userName: user.userName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "24h",
    });

    await updateUserService(user.id || "", {
      recentlyActive: Date.now(),
      token,
      totalScore:
        user.totalAverageWeightRatings * 1000000 +
        user.numberOfRents * 1000 +
        user.recentlyActive,
    });

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(`🥶🥶🥶🥶 ~ フ ク ロ ウ error:`, error);
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
};
