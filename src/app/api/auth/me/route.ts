import { NextResponse } from 'next/server';
import { prisma } from '@/prisma-setup/prisma-client';
// import { getUserSession } from '@/shared/lib/get-user-session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/constants/auth-options';

export const dynamic = 'force-dynamic'; // ПРИ СбОРКЕ не работает getUserSession()
// // и тогда пытаемся получить серверную сессию в первых 3х строках
// export async function GET(req: any, res: any) {
//   try {
//     const user = await getServerSession(req, res, authOptions);
// и вылазят проблемы с типизацией req, res, authOptions - и они пока  НЕ РЕШЕНЫ
// можно попробовать СБОРКУ с'force-dynamic' но со старой функцией getUserSession();
// в dev-режиме все нормально работает с getUserSession(); см.22:43:00+

export async function GET(req: any, res: any) {
  // export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const user = await getServerSession(req, res, authOptions);
    // export async function GET() {
    //   try {
    //     const user = await getUserSession();

    if (!user) {
      return NextResponse.json(
        { message: 'Вы не авторизованы' },
        { status: 401 }
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        // id: Number(user.id), //for getUserSession
        id: Number(user.user.id), //for getServerSession
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: '[USER_GET] Server error' },
      { status: 500 }
    );
  }
}
