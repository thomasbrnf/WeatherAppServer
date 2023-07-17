import express from "express";
import { locationsRouter } from "../endpoints/locations";
import { specificLocationRouter } from "../endpoints/specificLocation";
import { weatherDataRouter } from "../endpoints/weatherData";
import { addLocationRouter } from "../endpoints/addLocation";
const router = express.Router();

router.use(locationsRouter);
router.use(specificLocationRouter);
router.use(weatherDataRouter);
router.use(addLocationRouter);

export { router as protectedRouter };
