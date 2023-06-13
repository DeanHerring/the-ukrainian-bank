import { Request, Response } from 'express';
import { LoginPerson, ApiAuthUserResponce } from '@/interfaces/interfaces';
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const authUser = async (req: Request<LoginPerson>, res: Response<ApiAuthUserResponce>): Promise<void> => {
  const { email, password } = req.body;
  const hash: string = createHash('sha256').update(password).digest('hex');

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Такого пользователя не существует');
    }
    if (hash !== user.password) {
      throw new Error('Пароль введён неверно');
    }
    if (user.status) {
      throw new Error('Вы заблокированы');
    }
    if (user) {
      const privateKey = createHash('sha256').digest('hex');
      const token: string = jwt.sign({ id: user.id }, privateKey, {
        expiresIn: '1h',
      });
      const session = await prisma.sessions.create({
        data: {
          token,
          private_key: privateKey,
        },
      });
      session && res.json({ status: 1, token: session.token });
    }
  } catch (error: any) {
    res.json({ status: 0, err: error.message });
  }
};
