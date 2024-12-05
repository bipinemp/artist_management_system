import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const port = process.env.POSTGRES_PORT
  ? Number(process.env.POSTGRES_PORT)
  : undefined;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port,
});

export default pool;
