import dotenv from "dotenv";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { authRouter } from "./routers/authRouter";
import { protectedRouter } from "./routers/protectedRouter";
import { authenticateToken } from "./utilities/middleware";
import {
  initialiseLocationsTable,
  initialiseUsersTable,
} from "./utilities/database";

dotenv.config();

const app = express();
const port = process.env.PORT;

initialiseUsersTable();
initialiseLocationsTable();

app.use(compression());
app.use(cookieParser());

app.use(authRouter);
app.use("/api", authenticateToken, protectedRouter);

app.listen(port);
