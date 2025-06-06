import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler } from "../utils/errorHandler";
import routes from "../routes/routes";

dotenv.config();

const app = express();

app.use(morgan("common"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/~health", (_, res) => {
  res.json({ message: "Server is Online & Healthy!" });
});

app.use("/api", routes);
app.use(errorHandler);

export default app;
