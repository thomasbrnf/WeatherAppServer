import { Response } from "express";

export function handleDbErrors(err: any, res: Response) {
  res.status(500).json({ error: err.message });
}
