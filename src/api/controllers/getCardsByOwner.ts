import { Request, Response } from 'express';

import { CardProps, ApiCardResponce } from '@/interfaces/interfaces';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCardsByOwner = async (req: Request<{ id: string }>, res: Response<ApiCardResponce>): Promise<void> => {
  const id: number = parseInt(req.params.id);

  const cards = await prisma.cards.findMany({
    where: {
      owner_id: id,
    },
    select: {
      publisher: true,
      currency: true,
      address: true,
      pin_code: true,
      type: true,
      full_name: true,
      expiration: true,
      background: true,
    },
  });

  const cardToChunks = (address: string): string[] => {
    const result: string[] = [];

    for (let i: number = 0; i < address.length; i += 4) {
      const chunk = address.substring(i, i + 4);
      result.push(chunk);
    }

    return result;
  };

  const body: CardProps[] = cards.map((card) => {
    return {
      ...card,
      address: cardToChunks(card.address),
    };
  });

  body.length
    ? res.json({ status: 1, body })
    : res.json({ status: 0, err: 'Произошёл пиздец во время доставания карт из БД' });
};
