import { Router } from "express";

const router = Router();
const db = require("./database");

router.get("/locations", (res) => {
  const sql = "SELECT * FROM locations";
  db.query(sql, (err, result) => {
    if (err) console.error(err.message);
    res.json(result);
  });
});

module.exports = router;
