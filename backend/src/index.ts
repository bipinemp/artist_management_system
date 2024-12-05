import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import artistRoutes from "./routes/artistRoutes";
import musicRoutes from "./routes/musicRoutes";

const app: Express = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/musics", musicRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Server setup
app.listen(PORT, () => {
  console.log(`Server is running on port :: ${PORT}`);
});
