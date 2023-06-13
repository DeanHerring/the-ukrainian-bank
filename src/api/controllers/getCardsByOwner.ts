import { Request, Response } from 'express';

// CardProps,
import { CardProps, ApiCardResponce } from '@/interfaces/interfaces';
import { Utils } from '../../utils/utils.ts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const utils = new Utils();

export const getCardListByOwner = async (
  req: Request<{ token: string }>,
  res: Response<ApiCardResponce>,
): Promise<void> => {
  const token: string = req.params.token;

  const data = await utils.parseToken(token);

  if (data.success) {
    const cards = await prisma.cards.findMany({
      where: {
        owner_id: data.decode_token?.id,
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
  }
};
