import sqlite3 from "sqlite3";
import { open } from "sqlite";

// NOTE: path must be relative to process.cwd()!
// אם אתה בפרודקשן, שנה מיקום בהתאם
export async function openDb() {
  return open({
    filename: "./weather.sqlite",
    driver: sqlite3.Database,
  });
}
