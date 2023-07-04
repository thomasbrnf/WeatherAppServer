import express from 'express';
import { router } from "./routers/router";
import { initialiseDatabase } from "./utilities/middleware";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(initialiseDatabase);
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
