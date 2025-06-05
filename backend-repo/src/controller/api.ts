import { NextFunction, Request, Response } from "express";
import {
  addUser,
  getUserByUserName,
  getUsers,
  updateUser,
} from "../repository/userCollection";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";
import { checkHash } from "../utils/bcrypt";
import { AppError } from "../utils/errorHandler";

export const createUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    const id = await addUser(user);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;
    const user = await getUserByUserName(userName);

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
      expiresIn: "1h",
    });

    await updateUser(user.id || "", {
      recentlyActive: Date.now(),
      token,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 3600 * 1000,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
