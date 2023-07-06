import * as sqlite3 from "sqlite3";

export const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE,
  handleError,
);

export function initialiseLocationsTable() {
  db.run(`CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name string NOT NULL,  
        openweather_api_name string NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
}

export function initialiseUsersTable() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username string NOT NULL,
    password string NOT NULL,
    salt string NOT NULL 
  )`)
}

function handleError(err: Error | null) {
  if (err) console.error(err.message);
  console.log("Connected to the SQLite database.");
}
