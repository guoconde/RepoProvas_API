import { Request, Response } from 'express';
import userService from '../service/userService.js';

export async function authUser(req: Request, res: Response) {
  const data = req.body;

  const token = await userService.login(data);

  res.send({ token }).status(200);
}

export async function newUser(req: Request, res: Response) {
  const userData = req.body;

  await userService.insert(userData);

  res.sendStatus(200);
}
