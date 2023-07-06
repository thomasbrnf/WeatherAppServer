import express, { Router } from "express";
import { handleErrors } from "../utilities/middleware";
import { db } from "../utilities/database";

const router = Router();
const sql = "SELECT * FROM locations WHERE id = ?";

router.use(express.json());

router.get("/locations/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const row = (await getLocation(id)) as any[];
    sendLocation(res, row);
  } catch (err) {
    handleErrors(err, res);
  }
});

function sendLocation(res: any, rows: any[]) {
  res.json(rows);
}

function getLocation(id: string) {
  return new Promise((resolve, reject) => {
    db.all(sql, [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export { router as specificLocationRouter };
