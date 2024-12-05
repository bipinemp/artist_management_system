import { Request, Response } from "express";
import {
  createArtist,
  deleteArtist,
  getArtists,
  updateArtist,
} from "../models/artistModel";

export const getArtistData = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const artistsData = await getArtists(Number(page), Number(pageSize));

    res.status(200).json({
      message: "Artists fetched successfully.",
      artistsData,
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

export const createArtistData = async (req: Request, res: Response) => {
  const {
    name,
    dob,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  } = req.body;

  try {
    const artistData = await createArtist(
      name,
      dob,
      gender,
      address,
      first_release_year,
      no_of_albums_released
    );

    res
      .status(201)
      .json({ message: "Artist created successfully.", artistData });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};

export const updateArtistData = async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    name,
    dob,
    gender,
    address,
    first_release_year,
    no_of_albums_released,
  } = req.body;

  try {
    const artistData = await updateArtist(
      Number(id),
      name,
      dob,
      gender,
      address,
      first_release_year,
      no_of_albums_released
    );

    res
      .status(200)
      .json({ message: "Artist updated successfully.", artistData });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};

export const deleteArtistData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteData = await deleteArtist(Number(id));

    res
      .status(200)
      .json({ message: "Artist deleted successfully.", deleteData });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};
