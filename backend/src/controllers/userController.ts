import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../models/userModel";

export const getUsersData = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const usersData = await getUsers(Number(page), Number(pageSize));

    res.status(200).json({
      message: "Users fetched successfully.",
      usersData,
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

export const createUserData = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    dob,
    gender,
    address,
  } = req.body;

  try {
    const userData = await createUser(
      first_name,
      last_name,
      email,
      password,
      phone,
      dob,
      gender,
      address
    );

    res.status(201).json({ message: "User created successfully.", userData });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name, phone, dob, gender, address } = req.body;

  try {
    const userData = await updateUser(
      Number(id),
      first_name,
      last_name,
      phone,
      dob,
      gender,
      address
    );

    res.status(200).json({ message: "User updated successfully.", userData });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};

export const deleteUserData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteData = await deleteUser(Number(id));

    res.status(200).json({ message: "User deleted successfully.", deleteData });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, Try again later.",
    });
  }
};
