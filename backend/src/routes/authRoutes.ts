import express, { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/authController";

const router: Router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refreshToken", refreshToken);

export default router;
