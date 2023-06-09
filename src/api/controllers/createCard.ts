import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { Card } from '@/interfaces/interfaces';

const prisma = new PrismaClient();

export const createCard = async (req: Request<Card>, res: Response<any>): Promise<void> => {
  console.log(req.body);

  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getFullYear() + 3, currentDate.getMonth(), currentDate.getDate());

  const addressGen = (): string => {
    let randomNumber: string = '';
    const characters: string = '123456789';
    const length: number = 16;

    for (let i: number = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      randomNumber += characters[randomIndex];
    }

    return randomNumber;
  };

  const address = addressGen();

  const card = await prisma.cards.create({
    data: {
      full_name: req.body.full_name,
      type: req.body.card_type,
      expiration: expirationDate,
      currency: req.body.currency,
      balance: 0.0,
      address,
      pin_code: String(req.body.pin_code),
      monthly_limit: req.body.monthly_limit,
      background: req.body.card_background && req.body.card_background,
      daily_limit: req.body.daily_limit,
      passport: req.body.passport,
      phone: req.body.phone,
      email: req.body.email,
      tariff_plan_id: req.body.tariff_plan_id,
      owner_id: req.body.owner_id,
    },
  });

  console.log(card);

  res.status(200);
};
