import { prisma } from '@/prisma-setup/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return NextResponse.json(ingredients);
}
