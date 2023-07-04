import express, { Request, Response } from "express";
import { db } from "../database/database";

const router = express.Router();

router.use(express.json());
router.post("/newLocation", (req: Request, res: Response) => {  
  const { name } = req.body;    
  if (!name) return res.status(400).send("Name required.");
  db.run(
    `INSERT INTO locations (name, openweather_api_name) 
    VALUES (?, ?)`,    
    [name, name],    
    (err: Error) => {      
      if (err) {
        console.error(err.message);
        res.status(500).send("Error adding location");
      } else {
        res.status(201).json("Location added");
      }
    }
  );
});

module.exports = router;
