import { Router } from "express";

const router = Router();
const db = require("./database");

router.get("/locations/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM locations WHERE id =?", [id], (err, result) => {
    if (err) console.error(err.message);
    else res.json(result[0]);
  });
});

module.exports = router;
