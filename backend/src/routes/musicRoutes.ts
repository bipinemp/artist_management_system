import express, { Router } from "express";
import {
  createMusicData,
  getMusicsData,
  updateMusicData,
  deleteMusicData,
} from "../controllers/musicController";
import protect from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.route("/").get(protect, getMusicsData);
router.route("/").post(protect, createMusicData);
router.route("/:id").put(protect, updateMusicData);
router.route("/:id").delete(protect, deleteMusicData);

export default router;
