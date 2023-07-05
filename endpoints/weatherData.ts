import axios from "axios";
import express, { Router } from "express";
import { handleDbErrors } from "../utilities/middleware";
import { db } from "../utilities/database";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const apiKey = process.env.OPEN_WEATHER_API_KEY;
const sql = "SELECT openweather_api_name FROM locations WHERE id = ?";

router.use(express.json());

router.get("/weatherData/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const apiName = await getApiName(id);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${apiName}&appid=${apiKey}`;

    const { data: weatherData } = await axios.get(url);
    res.json(weatherData);
  } catch (error) {
    handleDbErrors(error, res);
  }
});

function getApiName(id: string) {
  return new Promise((resolve, reject) => {
    db.all(sql, [id], (err, rows) => {
      if (err) reject(err);
      else {
        const apiName = getApiNameFromRow(rows);
        resolve(apiName);
      }
    });
  });
}

function getApiNameFromRow(rows: any[]) {
  const row = rows[0] || ({ openweather_api_name: null } as any);
  return row.openweather_api_name;
}

export { router as weatherDataRouter };
