import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../db.js';
import userService from '../service/userService.js';

// interface AuthUser {
//   email: string,
//   password: string
// }

export async function authUser(req: Request, res: Response) {
  const data = req.body;

  const user = await userService.login(data);

  res.send(user).status(200);
}

export async function newUser(req: Request, res: Response) {
  const userData = req.body;
  const { password } = userData;

  const userExits = userService.findUser(userData.email);
  if (!userExits) throw { type: 'conflict', message: 'Email already registered.' };

  const hashedPassword = bcrypt.hashSync(password, 8);

  await prisma.users.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });

  res.sendStatus(200);
}
