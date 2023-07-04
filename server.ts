import { initialiseTable } from "./database/database";
require("dotenv").config();

const express = require('express');
const app = express();
const locationsRouter = require("./endpoints/locations");
const specificLocationRouter = require("./endpoints/specificLocation");
const newLocationRouter = require("./endpoints/newLocation");
const weatherDataRouter = require("./endpoints/weatherData");

const port = process.env.PORT;

initialiseTable();

app.use("/api", locationsRouter);
app.use("/api", specificLocationRouter);
app.use("/api", newLocationRouter);
app.use("/api", weatherDataRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
