import express from "express";
import { registerRouter } from "../endpoints/authEndpoints/register";
import { loginRouter } from "../endpoints/authEndpoints/login";

const router = express.Router();

router.use(registerRouter);
router.use(loginRouter);

export { router as authRouter };
