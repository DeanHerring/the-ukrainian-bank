import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import { DefaultApiResponce, IUser } from '@/interfaces/interfaces';

const prisma = new PrismaClient();

export const addUser = async (req: Request<IUser>, res: Response<DefaultApiResponce>): Promise<void> => {
  const { email, name, password } = req.body;
  const hash: string = createHash('sha256').update(password).digest('hex');

  try {
    const user = await prisma.users.create({
      data: {
        email,
        name,
        password: hash,
      },
    });

    user && res.json({ status: 1 });
  } catch (err: any) {
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      res.json({ status: 0, err: 'Email уже занят' });
    } else {
      console.log('Внутренняя ошибка сервера: ', err);
      res.json({ status: 0, err: 'Внутренняя ошибка сервера' });
    }
  }
};
