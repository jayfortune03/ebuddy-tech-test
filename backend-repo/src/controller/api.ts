import { Request, Response } from "express";
import { addUser, getUsers } from "../repository/userCollection";
import { User } from "../entities/user";

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
