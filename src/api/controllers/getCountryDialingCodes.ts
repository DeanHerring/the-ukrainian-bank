import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { ApiCountriesResponce } from '@/interfaces/interfaces';

const prisma = new PrismaClient();

export const getCountryDialingCodes = async (
  _: Request<undefined>,
  res: Response<ApiCountriesResponce>,
): Promise<void> => {
  const countryDialingCodes = await prisma.aviable_Countries.findMany({
    select: { country: true, flag: true, dialing_code: true },
  });

  countryDialingCodes.length
    ? res.json({ status: 1, body: countryDialingCodes })
    : res.json({ status: 1, err: 'Не удалось подгрузить страны' });
};
