import axios from "axios";
import express, { Router } from "express";
import { db } from "../utilities/database";
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const apiKey = process.env.OPEN_WEATHER_API_KEY;
const sql = "SELECT openweather_api_name FROM locations WHERE id = ?";

router.use(express.json());

router.get("/locationsData/:id", (req, res) => {
  const id = req.params.id;
  
  db.all(sql, [id], (err: Error, row: any[]) => {
    if (err) console.log(err)
    else {
      const apiName = row[0].openweather_api_name;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${apiName}&appid=${apiKey}`
      axios.get(url)
        .then((response: any) => {
          const weatherData = response.data;
          res.json(weatherData);
        })
        .catch((error: any) => {
          if (error.response.status === 404) {
            res.status(404).json({
              error: 'Location not found'
            });  
          }
        });
    }
  });  
})

export { router as weatherDataRouter }