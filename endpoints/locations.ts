import { Router } from "express";
import { Response } from "express";


const router = Router();
const db = require("../database");

router.get("/locations", (res: Response) => {
  const sql = "SELECT * FROM locations";
  db.query(sql, (err: Error, result: any[]) => {
    if (err) console.error(err.message);
    res.json(result);
  });
});

module.exports = router;
