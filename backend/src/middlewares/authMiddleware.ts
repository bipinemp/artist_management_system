import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../configs/db";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  try {
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      const decoded: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      );

      const userData = await pool.query(
        "SELECT COUNT(id) FROM users WHERE id = $1",
        [decoded.user_id]
      );

      if (userData.rows[0].count === 0) {
        res.status(401).json({ message: "Unauthorized." });
      }

      next();
    } else {
      res.status(401).json({ message: "Unauthorized." });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized." });
  }
};

export default protect;
