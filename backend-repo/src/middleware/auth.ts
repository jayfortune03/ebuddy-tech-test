import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../repository/userCollection";
import { AppError } from "../utils/errorHandler";

const verifyAccessToken = (accessToken: string | undefined) => {
  try {
    if (!accessToken) throw "Token Expired";
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;
    return payload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || error === "Token Expired")
      throw new AppError("Token Expired", 401);
    throw error;
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    const { id } = verifyAccessToken(token);
    const user = await getUserById(id);
    if (!user || user.token !== token)
      throw new AppError("Token is invalid!", 401);

    next();
  } catch (error) {
    next(error);
  }
};
