import express, { Router } from "express";
import {
  createArtistData,
  deleteArtistData,
  getArtistData,
  updateArtistData,
} from "../controllers/artistController";
import protect from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.route("/").get(protect, getArtistData);
router.route("/").post(protect, createArtistData);
router.route("/:id").put(protect, updateArtistData);
router.route("/:id").delete(protect, deleteArtistData);

export default router;
