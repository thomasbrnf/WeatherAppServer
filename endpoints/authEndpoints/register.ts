import bcrypt from "bcrypt";
import express from "express";
import { handleErrors } from "../../utilities/middleware";
import { db } from "../../utilities/database";

const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
  console.log(req);
  try {
    const { username, password } = req.body;
    const { salt, hashedPassword } = await hashPassword(password);

    await addUser(username, hashedPassword, salt);

    res.status(201).json("The user is registered");
  } catch (err) {
    handleErrors(err, res);
  }
});

async function addUser(
  username: string,
  password: string,
  salt: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, password, salt)
        VALUES (?, ?, ?)`,
      [username, password, salt],
      (err: Error) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
}

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return { salt, hashedPassword };
}

export { router as registerRouter };
