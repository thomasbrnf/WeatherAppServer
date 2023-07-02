import { initialiseTable } from "./database";

require("dotenv").config();

const express = require('express');
const app = express();

const locationsRouter = require("./endpoints/locations");
const specificLocationRouter = require("./endpoints/specificLocation");
const newLocationRouter = require("./endpoints/newLocation");
const weatherDataRouter = require("./endpoints/weatherData");

const port = process.env.PORT;

initialiseTable();

app.use("/locations", locationsRouter);
app.use("/specificLocation", specificLocationRouter);
app.use("/newLocation", newLocationRouter);
app.use("/weatherData", weatherDataRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
