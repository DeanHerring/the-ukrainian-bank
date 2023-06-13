import { randomBytes } from 'crypto';
import secp256k1 from 'secp256k1';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface VerifyToken {
  status: boolean;
  error?: string;
}

interface ParseTokenResult {
  success: boolean;
  decode_token?: JwtPayload;
  error?: string;
  private_key?: string;
}

// interface GetPrivateKeyResult {
//   success: boolean;
//   private_key?: string;
//   error?: string;
// }

export class Utils {
  // Сгенерировать приватный ключ
  generatePrivateKey(): string {
    let private_key: Buffer;
    do {
      private_key = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(private_key));

    return private_key.toString('hex');
  }

  // Верификация токена
  checkTokenExpiration(token: string, private_key: string): VerifyToken {
    try {
      const decode = jwt.verify(token, private_key) as JwtPayload;
      const current_time: number = Math.floor(Date.now() / 1000);

      if (decode && decode.exp !== undefined && current_time < decode.exp) {
        return { status: true };
      } else {
        return { status: false, error: 'Срок годности токена истёк' };
      }
    } catch (error: any) {
      return { status: false, error: 'Неизвестная ошибка' };
    }
  }

  // Парсинг токена
  async parseToken(token: string): Promise<ParseTokenResult> {
    try {
      const session = await prisma.sessions.findUnique({
        where: {
          token,
        },
      });

      if (!session) {
        throw new Error('Сессия не найдена');
      }

      const private_key: string = session.private_key;
      const decode_token = jwt.verify(token, private_key) as JwtPayload;

      return { success: true, decode_token };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Достать приватный ключ по токену
  // async getPrivateKeyByToken(token: string): Promise<GetPrivateKeyResult> {
  //   try {
  //     const data = await prisma.sessions.findUnique({
  //       where: {
  //         token,
  //       },
  //     });

  //     if (!data) {
  //       throw new Error('[GetPrivateKeyByToken] Сессия не существует');
  //     }

  //     return { success: true, private_key: data.private_key };
  //   } catch (error: any) {
  //     return { success: false, error: error.message };
  //   }
  // }
}
