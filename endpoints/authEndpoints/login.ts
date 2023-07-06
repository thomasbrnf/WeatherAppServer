import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { handleErrors } from "../../utilities/middleware";
import { db } from "../../utilities/database";

interface User {
    salt: string;
    password: string; 
}

const router = express.Router();
const sql = 'SELECT salt, password FROM users WHERE username = ?';
const jwtSecret = process.env.JWT_SECRET!

dotenv.config();

router.use(express.json());

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const { salt, hashedPassword } = await getSaltAndHashedPassword(username);

      const hashed = await bcrypt.hash(password, salt);

      validateLogin(username, hashed, hashedPassword, res);
    } catch (err) {
      handleErrors(err, res);  
    }
  });

function validateLogin(username: string, hashed: string,
                        hashedPassword: string, res: any) {
    if (hashed == hashedPassword) {
      const token = jwt.sign({ username }, jwtSecret);
      res.cookie("token", token, { httpOnly: true,
        expires: new Date(Date.now() + 3600000),
    })
      .send();
    }else{
        res.status(201).json('Wrong password');
    }
}

async function getSaltAndHashedPassword(username: string) {
    const row = await getUserData(username) as User;  
    const { salt, hashedPassword } = await getSaltAndPassword(row);

    return { salt, hashedPassword };
}

async function getUserData(username: string){
    const user = await new Promise((resolve, reject) => {
        db.all(sql, [username], (err, rows) => {
          if (err) reject(err);
          else resolve(rows[0]); 
        });
       });

       return user;
}

async function getSaltAndPassword(row: User){
    const salt = row.salt;  
    const hashedPassword = row.password;
    
    return { salt, hashedPassword };
}

export { router as loginRouter }