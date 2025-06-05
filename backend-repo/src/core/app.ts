import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes";
import dotenv from "dotenv";
import { errorHandler } from "../utils/errorHandler";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Modular Express Firebase Server!" });
});

app.use("/api", userRoutes);
app.use(errorHandler);

export default app;
