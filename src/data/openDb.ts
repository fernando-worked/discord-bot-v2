import sqlite3 from "sqlite3"
import { open } from "sqlite"

export async function openDb () {
  return open({
    filename: `${process.env.NODE_ENV == "producao" ? "" : "src/"}data/db/database.db`,
    driver: sqlite3.Database
  });
}