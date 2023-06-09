import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { Card, ApiCardResponce } from '@/interfaces/interfaces';

const prisma = new PrismaClient();

export const createCard = async (req: Request<Card>, res: Response<ApiCardResponce>): Promise<void> => {
  const currentDate: Date = new Date();
  const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year: string = String(currentDate.getFullYear()).slice(-2);
  const createDate: string = `${month}/${year}`;
  const expirationDate: string = `${month}/${parseInt(year) + 3}`;

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
      createdAt: createDate,
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

  // const cardToChunks = (address: string): string[] => {
  //   const result: string[] = [];

  //   for (let i: number = 0; i < address.length; i += 4) {
  //     const chunk = address.substring(i, i + 4);
  //     result.push(chunk);
  //   }

  //   return result;
  // };

  // const chunkAddress = cardToChunks(card.address);

  card
    ? res.json({ status: 1 })
    : res.json({ status: 0, err: 'Случился какой-то пиздосевич пиздосян во время генерации карты' });
};
