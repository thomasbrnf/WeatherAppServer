import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

const jwtSecret = process.env.JWT_SECRET!

dotenv.config();

export function authenticateToken(req: any, res: Response, next: NextFunction){
  const token = req.cookies && req.cookies.token;
  console.log(jwtSecret)

  if(token){
    jwt.verify(token, jwtSecret, (err: any, user: any) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
     req.user = user;
     next(); 
    })
  } else {
    res.status(401).json({ message: "You are not authenticated!" });    
  }
}

export function handleErrors(err: any, res: Response) {
  res.status(500).json({ error: err.message });
}

