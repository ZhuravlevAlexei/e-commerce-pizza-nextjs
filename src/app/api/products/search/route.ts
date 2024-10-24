import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive', //does not work with cyrillic on Vercel
      },
    },
    // take: 5,
  });

  if (products) {
    return NextResponse.json(products);
  }

  return NextResponse.json({});
}
