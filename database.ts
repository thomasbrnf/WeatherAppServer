import * as sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE,
  handleError
);

export function initialiseTable() {
  db.run(`CREATE TABLE IF NOT EXISTS locations (
        id: number PRIMARY KEY,
        name: string NOT NULL,  
        openweather_api_name: string NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
}

function handleError(err) {
  if (err) console.error(err.message);
  console.log("Connected to the SQLite database.");
}

module.exports = db;