import { Router } from "express";

const router = Router();
const db = require("../database");

router.post("/", (req, res) => {
  const location = req.body;
  if (!location) return res.status(400).send("Location required.");
  db.query(
    `
    INSERT INTO locations (location) 
    VALUES ($1, $2)
    `,
    location
  );

  res.status(201).json("Location added");
});

module.exports = router;
