import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db.js';

async function findUser(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  return user;
}

export type UserData = Omit<users, 'id'>
async function login(data: UserData) {
  const { email, password } = data;
  const user = await findUser(email);

  if (!user) throw { type: 'unauthorized', message: 'Incorrect credentials' };

  const hashedPassword = bcrypt.compareSync(password, user.password);

  if (!hashedPassword) throw { type: 'unauthorized', message: 'Incorrect credentials' };

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
  );

  return token;
}

async function insert(data: UserData) {
  const userData = data;
  const { password } = userData;

  const userExits = findUser(userData.email);
  if (!userExits) throw { type: 'conflict', message: 'Email already registered.' };

  const hashedPassword = bcrypt.hashSync(password, 8);

  await prisma.users.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });
}

export default {
  login,
  insert,
};
