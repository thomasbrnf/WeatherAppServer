import { Router } from "express";

const router = Router();
const db = require("../database");

router.post("/newLocation", (req, res) => {
  const { name } = req.body;  
  if (!name) return res.status(400).send("Name required.");

  db.query(
    `
    INSERT INTO locations (name)  
    VALUES ($1, $2) 
    `,
    [name]    
  );

  res.status(201).json("Location added");
});

module.exports = router;
