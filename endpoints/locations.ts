import express, { Response } from "express";
import { handleDbErrors } from "../utilities/middleware";
import { db } from "../utilities/database";

const router = express.Router();
const sql = "SELECT * FROM locations";

router.use(express.json());

router.get('/locations', (req, res: Response) => {
    db.all(sql, (err: Error, rows: any[]) => {
      if (err) {
        handleDbErrors
      } else {
        sendLocations
      }   
    });
});
function sendLocations(rows: any[], res: Response){
  res.json(rows);
}

export { router as locationsRouter }
