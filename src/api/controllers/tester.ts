// import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
// import { Utils } from '../../utils/utils.ts';

// const utils = new Utils();

// const prisma = new PrismaClient();

export const tester = async (_: Request<any>, res: Response<any>): Promise<void> => {
  // const token =
  // 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjg2NjI3MzExLCJleHAiOjE2ODY2MzA5MTF9.sq1L8O2tZf_utl9VI5VpwQXp8vreu3VOEsN1f0vt65I';

  // const decode_token = await utils.parseToken(token);
  // const result = await utils.getPrivateKeyByToken(token);

  // console.log(result);
  // console.log('Decode Token: ', decode_token);

  res.status(200);
};
