import { Request, Response } from "express";
import {
  createMusic,
  deleteMusic,
  getArtistMusics,
  updateMusic,
} from "../models/musicModel";

export const getMusicsData = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10, artist_id } = req.query;

  try {
    const artistMusicData = await getArtistMusics(
      Number(page),
      Number(pageSize),
      Number(artist_id)
    );

    res.status(200).json({
      message: "Artist's musics fetched successfully.",
      artistMusicData,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};

export const createMusicData = async (req: Request, res: Response) => {
  const { artist_id, title, album_name, genre } = req.body;

  try {
    const artistMusicData = await createMusic(
      artist_id,
      title,
      album_name,
      genre
    );

    res.status(201).json({
      message: "Artist's music created successfully.",
      artistMusicData,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};

export const updateMusicData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, album_name, genre } = req.body;

  try {
    const artistMusicData = await updateMusic(
      Number(id),
      title,
      album_name,
      genre
    );

    res.status(200).json({
      message: "Artist's music updated successfully.",
      artistMusicData,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};

export const deleteMusicData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteData = await deleteMusic(Number(id));

    res
      .status(200)
      .json({ message: "Artist's music deleted successfully.", deleteData });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};
