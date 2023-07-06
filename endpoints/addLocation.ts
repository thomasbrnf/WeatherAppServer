import express from "express";
import { handleErrors } from "../utilities/middleware";
import { db } from "../utilities/database";

const router = express.Router();

router.use(express.json());

router.post("/addLocation", async (req, res) => {
  const { name } = req.body;

  try {
    validateLocation(name);

    await addLocation(name);
    res.status(201).json("Location added");
  } catch (err) {
    handleErrors(err, res);
  }
});

function validateLocation(name: string) {
  if (!name) throw new Error("Name is required");
}

async function addLocation(name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO locations (name, openweather_api_name) 
       VALUES (?, ?)`,
      [name, name],
      (err) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
}

export { router as addLocationRouter };
