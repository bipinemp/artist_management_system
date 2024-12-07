import path from "path";
import fs from "fs/promises";
import pool from "../configs/db";

const runMigrations = async (fileName?: string) => {
  try {
    const migrationsPath = path.join(__dirname, "../db/migrations");
    if (fileName) {
      // Runs a specific migration file
      const filePath = path.join(migrationsPath, fileName);
      try {
        const sql = await fs.readFile(filePath, "utf8");
        console.log(`Running migration: ${fileName}`);
        await pool.query(sql);
        console.log(`Migration ${fileName} completed successfully.`);
      } catch (err) {
        throw new Error(`Failed to run migration: ${fileName}. ${err}`);
      }
    } else {
      // Runs all migrations files
      const files = await fs.readdir(migrationsPath);
      for (const file of files) {
        const filePath = path.join(migrationsPath, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile()) {
          const sql = await fs.readFile(filePath, "utf8");
          console.log(`Running migration: ${file}`);
          await pool.query(sql);
        }
      }
      console.log("<------------- All Migrations Completed ------------->");
    }
    process.exit(0);
  } catch (error) {
    console.error("Migration Failed: ", error);
    process.exit(1);
  }
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const fileName = args[0];
  runMigrations(fileName);
}

export default runMigrations;
