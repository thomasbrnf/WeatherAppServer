import express from 'express';
const router = express.Router();

import { locationsRouter } from "../endpoints/locations";
import { specificLocationRouter } from "../endpoints/specificLocation";
import { weatherDataRouter } from "../endpoints/weatherData";
import { addLocationRouter } from "../endpoints/addLocation";

// GET
router.use(locationsRouter);
router.use(specificLocationRouter);
router.use(weatherDataRouter);
// POST
router.use(addLocationRouter);

export { router }