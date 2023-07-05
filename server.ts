import express from "express";
import { router } from "./routers/router";
import compression from "compression";
import dotenv from "dotenv";
import { initialiseTable } from "./utilities/database";

dotenv.config();

const app = express();
const port = process.env.PORT;

initialiseTable();

app.use(compression());
app.use("/api", router);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
