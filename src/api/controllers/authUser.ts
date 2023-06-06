import { Request, Response } from 'express';
import { LoginPerson, ApiResponce } from '@/interfaces/interfaces';
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

export const authUser = async (req: Request<LoginPerson>, res: Response<ApiResponce>): Promise<void> => {
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
    res.json({ status: 1, body: { id: user.id, balance: user.balance } });
  } catch (error: any) {
    res.json({ status: 0, err: error.message });
  }
};
