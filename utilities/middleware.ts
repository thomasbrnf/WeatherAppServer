import { initialiseTable } from "./database";
import { Request, Response, NextFunction } from "express";

export function initialiseDatabase(
  req: Request, 
  res: Response,
  next: NextFunction
) {
    initialiseTable();
    next(); 
}
export function handleDbErrors(err: Error, res: Response, next: NextFunction) {
  res.status(500).json({ error: err.message });
}
