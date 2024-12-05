import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../configs/db";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, password FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows[0].count === "0") {
      res.status(401).json({ message: "Invalid Credentials." });
      return;
    }

    const isPassWordCorrect = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (!isPassWordCorrect) {
      res.status(401).json({ message: "Invalid Credentials." });
      return;
    }

    // creating access token
    const accessToken = jwt.sign(
      {
        user_id: result.rows[0].id,
        email: result.rows[0].email,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        user_id: result.rows[0].id,
        email: result.rows[0].email,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1d is secs
    });

    res.status(200).json({
      user_id: result.rows[0].id,
      first_name: result.rows[0].first_name,
      last_name: result.rows[0].last_name,
      email: result.rows[0].email,
      access_token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong, Try again later." });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie("refresh_token", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Try again later." });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    if (req.cookies?.refresh_token) {
      const refreshToken = req.cookies.refresh_token;

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
          if (err) {
            res.status(401).json({ message: "Unauthorized." });
          } else {
            const accessToken = jwt.sign(
              {
                user_id: decoded.user_id,
                email: decoded.email,
              },
              process.env.ACCESS_TOKEN_SECRET as string,
              { expiresIn: "15m" }
            );

            res.status(200).json({ accessToken });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Unauthorized." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Try again later." });
  }
};
