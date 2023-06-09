// import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

// const prisma = new PrismaClient();

export const tester = async (_: Request<any>, res: Response<any>): Promise<void> => {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = String(currentDate.getFullYear()).slice(-2);
  const formattedDate = `${month}/${year}`;

  console.log(formattedDate);

  // const entity = prisma.testing.create({
  //   data: {
  //     date: formattedDate,
  //     money: 123123,
  //   },
  // });

  res.status(200);
};
