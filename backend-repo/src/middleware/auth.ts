import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/errorHandler";
import { cookieOptions } from "../utils/cookieOptions";
import { getUserByIdService } from "../repository/userCollection";

const verifyAccessToken = (accessToken: string | undefined) => {
  try {
    if (!accessToken) throw new AppError("Token is not present", 401);
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    if (Date.now() / 1000 > payload.exp!) {
      throw new AppError("Token Expired", 401);
    }

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
    const user = await getUserByIdService(id);
    if (!user || user.token !== token)
      throw new AppError("Token is invalid!", 401);

    next();
  } catch (error) {
    if (error instanceof AppError && error.message === "Token Expired") {
      res.clearCookie("token", cookieOptions);
    }
    next(error);
  }
};
