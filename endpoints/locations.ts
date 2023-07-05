import express, { Response } from "express";
import { handleDbErrors } from "../utilities/middleware";
import { db } from "../utilities/database";

const router = express.Router();
const sql = "SELECT * FROM locations";

router.use(express.json());

router.get("/locations", async (req, res: Response) => {
  try {
    const rows = (await getLocations()) as any[];
    sendLocations(res, rows);
  } catch (err) {
    handleDbErrors(err, res);
  }
});

function sendLocations(res: Response, rows: any[]) {
  res.json(rows);
}

function getLocations() {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export { router as locationsRouter };
