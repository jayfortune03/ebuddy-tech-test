import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes";
import dotenv from "dotenv";
import { errorHandler } from "../utils/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/~health", (req, res) => {
  res.json({ message: "Server is Online & Healthy!" });
});

app.use("/api", userRoutes);
app.use(errorHandler);

export default app;
