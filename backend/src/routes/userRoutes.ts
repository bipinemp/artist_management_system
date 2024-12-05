import express, { Router } from "express";
import {
  createUserData,
  deleteUserData,
  getUsersData,
  updateUserData,
} from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.route("/").get(protect, getUsersData);
router.route("/").post(protect, createUserData);
router.route("/:id").put(protect, updateUserData);
router.route("/:id").delete(protect, deleteUserData);

export default router;
