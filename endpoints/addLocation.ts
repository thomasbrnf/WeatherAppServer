import express, { Request, Response } from "express";
import { handleDbErrors } from "../utilities/middleware";
import { db } from "../utilities/database";

const router = express.Router();

router.use(express.json());

router.post("/addLocation", (req: Request, res: Response) => {  
  const { name } = req.body;    
  if (!name) return res.status(400).send("Name required.");

  db.run(
    `INSERT INTO locations (name, openweather_api_name) 
    VALUES (?, ?)`,    
    [name, name],    
    (err: Error) => {      
      if (err) {
        handleDbErrors
      } else {
        res.status(201).json("Location added");
      }
    }
  );
});

export { router as addLocationRouter }
