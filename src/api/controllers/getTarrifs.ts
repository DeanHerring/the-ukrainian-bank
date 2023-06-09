import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ApiTarrifsResponce } from '@/interfaces/interfaces';

const prisma = new PrismaClient();

export const getTariffs = async (_: Request<undefined>, res: Response<ApiTarrifsResponce>): Promise<void> => {
  const tarrifs = await prisma.tariffs.findMany({
    where: { available: true },
    select: {
      id: true,
      title: true,
      monthly_limit: true,
      daily_limit: true,
    },
  });

  tarrifs.length ? res.json({ status: 1, body: tarrifs }) : res.json({ status: 0, err: 'Якась хуйня' });
};
