import { Router } from "express";

require("dotenv").config();

const axios = require("axios");
const router = Router();
const db = require("./database");
const apiKey = process.env.OPEN_WEATHER_API_KEY;

router.get("/locations/:id", (req, res) => {
  const id = req.params.id;
  getLocationApiName(id)
    .then(getWeatherData)
    .then((weatherData) => res.json(weatherData));
});

function getLocationApiName(id) {
  const sql = "SELECT openweather_api_name FROM locations WHERE id =?";

  return db.query(sql, [id]).then((result) => result[0].openweather_api_name);
}

function getWeatherData(apiName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${apiName}&appid=${apiKey}`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error("Location not found");
      }
    });
}

module.exports = router;
