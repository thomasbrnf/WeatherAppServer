import express, { Response } from "express";
import { db } from "../database/database";

const router = express.Router();

router.use(express.json());
router.get('/locations', (req, res: Response) => {
  const sql = "SELECT * FROM locations";
  try {
    db.all(sql, (err: Error, rows: any[]) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(rows)
      }   
    });
  } catch (err) {
    console.error((err as any).message);
  }
});

module.exports = router;
