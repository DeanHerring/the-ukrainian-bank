import { Request, Response } from 'express';
import { ApiUserByTokenResponce } from '@/interfaces/interfaces';
import { PrismaClient } from '@prisma/client';
import { Utils } from '../../utils/utils.ts';

const prisma = new PrismaClient();
const utils = new Utils();

export const getUserByToken = async (
  req: Request<{ token: string }>,
  res: Response<ApiUserByTokenResponce>,
): Promise<void> => {
  const token: string = req.params.token;
  const data = await utils.parseToken(token);

  if (data.success) {
    const user = await prisma.users.findUnique({ where: { id: data.decode_token?.id } });

    user &&
      res.json({
        status: 1,
        body: {
          balance: user.balance,
        },
      });
  } else {
    res.json({ status: 0, err: data.error });
  }
};
