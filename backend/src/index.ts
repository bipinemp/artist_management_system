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
//   const countResult = await pool.query(`
//       INSERT INTO music (title, album_name, genre, artist_id)
// VALUES
//   ('Sambodhan', 'Sambodhan', 'rock', 3),
//   ('Samjhi Baschu', 'Samjhi Baschu', 'rock', 3),
//   ('Hami Yestai Ta Ho Ni Bro', 'Hami Yestai Ta Ho Ni Bro', 'rnb', 3),
//   ('Yo Mann Ta Mero Nepali', 'Yo Mann Ta Mero Nepali', 'classic', 3),
//   ('Udhne Raat', 'Udhne Raat', 'jazz', 3),
//   ('Yatra', 'Yatra', 'rock', 3),
//   ('Parelima', 'Parelima', 'country', 3),
//   ('Maya', 'Maya', 'rnb', 3),
//   ('Pahilo Jindagani', 'Pahilo Jindagani', 'rock', 3),
//   ('Bohora', 'Bohora', 'rock', 3),
//   ('Raat Ko Bato', 'Raat Ko Bato', 'jazz', 3);

// `);
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
