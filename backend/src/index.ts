import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import artistRoutes from "./routes/artistRoutes";
import musicRoutes from "./routes/musicRoutes";
import pool from "./configs/db";

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

// async function dbrun() {
//   const countResult =
//     await pool.query(`INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address)
// VALUES ('John', 'Doe', 'johndoe@example.com', 'securepassword123', '+1234567890', '1990-01-01 00:00:00', 'm', '123 Main St, Springfield, IL')`);
//   console.log("countREsult : ", countResult);
// }

// dbrun();

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
