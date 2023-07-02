import { initialiseTable } from "./database";
import express from "express";

require("dotenv").config();

const app = express();

const locationsRouter = require("./locations");
const specificLocationRouter = require("./specificLocation");
const newLocationRouter = require("./newLocation");
const weatherDataRouter = require("./weatherData");

const port = process.env.PORT;

initialiseTable();

app.use("/locations", locationsRouter);
app.use("/specificLocation", specificLocationRouter);
app.use("/newLocation", newLocationRouter);
app.use("/weatherData", weatherDataRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
