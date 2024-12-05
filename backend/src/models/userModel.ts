import pool from "../configs/db";
import bcrypt from "bcryptjs";

export const getUsers = async (page: number = 1, pageSize: number = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    const result = await pool.query(
      `SELECT id, first_name, last_name, email, phone, dob, gender, address 
       FROM users LIMIT $1 OFFSET $2`,
      [pageSize, skip]
    );

    const usersCountResult = await pool.query("SELECT COUNT(id) from users");
    const totalUsers = parseInt(usersCountResult.rows[0].count);
    const totalPages = Math.ceil(totalUsers / pageSize);

    return {
      users: result.rows,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    throw new Error("Unable to fetch users from database.");
  }
};

export const createUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  phone: string,
  dob: string,
  gender: string,
  address: string
) => {
  try {
    const userExists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      throw new Error("User already exists with that email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, phone, dob, gender, address) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, first_name, last_name, email, phone, dob, gender, address`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        dob,
        gender,
        address,
      ]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("Unable to create user in database.");
  }
};

export const updateUser = async (
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
  dob: string,
  gender: string,
  address: string
) => {
  try {
    const userExists = await pool.query("SELECT id FROM users WHERE id = $1", [
      id,
    ]);

    if (userExists.rows.length === 0) {
      throw new Error("User does not exists.");
    }

    const updateResult = await pool.query(
      `UPDATE users SET first_name = $1, last_name = $2, phone = $3, dob = $4, gender = $5, address = $6 WHERE id = $7 
       RETURNING id, first_name, last_name, email, phone, dob, gender, address`,
      [first_name, last_name, phone, dob, gender, address, id]
    );

    return updateResult.rows[0];
  } catch (error) {
    throw new Error("Unable to update user in database.");
  }
};

export const deleteUser = async (id: number) => {
  try {
    const userExists = await pool.query("SELECT id FROM users WHERE id = $1", [
      id,
    ]);

    if (userExists.rows.length === 0) {
      throw new Error("User does not exists.");
    }

    const deleteResult = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    return deleteResult.rowCount;
  } catch (error) {
    throw new Error("Unable to delete user from database.");
  }
};
