import path from "path";
import fs from "fs/promises";
import pool from "../configs/db";

const runMigrations = async () => {
  try {
    const migrationsPath = path.join(__dirname, "../db/migrations");
    const files = await fs.readdir(migrationsPath);

    for (const file of files) {
      const filePath = path.join(migrationsPath, file);
      const sql = await fs.readFile(filePath, "utf8");

      console.log(`Running migration : ${file}`);
      await pool.query(sql);
    }

    console.log("<------------- Migrations Completed ------------->");
  } catch (error) {
    console.error("Migration Failed: ", error);
  } finally {
    await pool.end();
  }
};

if (require.main === module) {
  runMigrations();
}

export default runMigrations;
