import fs from "fs";
import path from "path";
import pool from "../configs/db";

const seedDatabase = async () => {
  try {
    const seedFilePath = path
      .resolve(__dirname, "../db/seeds/seed.sql")
      .replace(/\\/g, "/");
    console.log("Seed file path:", seedFilePath);
    const seedSQL = fs.readFileSync(seedFilePath, "utf8");

    await pool.query(seedSQL);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
