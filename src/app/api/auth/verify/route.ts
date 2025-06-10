import { prisma } from '@/prisma-setup/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // const code = req.nextUrl.searchParams.get('code');
    const code = '';

    if (!code) {
      return NextResponse.json(
        {
          error: 'Code is not found in url. (Код не найден в url)',
        },
        { status: 400 }
      );
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code: code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json(
        {
          error: 'Verification code is not found in base. (Неверный код).',
        },
        { status: 400 }
      );
    }
    //подтверждаем регистрацию пользователя
    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });
    //чистим за собой запись с кодом, все удачно
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.log('error auth/verify GET: ', error);
  }
}
