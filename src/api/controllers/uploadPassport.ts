import { Request, Response } from 'express';

import { ApiPassportResponce } from '@/interfaces/interfaces';

export const uploadPassport = async (req: Request, res: Response<ApiPassportResponce>): Promise<void> => {
  const file = req.file;

  console.log(file);

  file
    ? res.json({ status: 1, filename: file.filename })
    : res.json({ status: 0, err: 'Во время загрузки паспорта произошел пиздяк.' });
};
