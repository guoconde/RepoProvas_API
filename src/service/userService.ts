import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db.js';

async function findUser(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  return user;
}

async function login(data) {
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

export default {
  findUser,
  login,
};
