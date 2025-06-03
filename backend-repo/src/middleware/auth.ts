import { Request, Response, NextFunction } from "express";
import { admin } from "../config/firebase";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return; // avoid returning Response
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).uid = decodedToken.uid;
    next(); // properly continue
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
