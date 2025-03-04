import { prisma } from '@/prisma-setup/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const stories = await prisma.story.findMany({
    include: {
      items: true,
    },
  });

  return NextResponse.json(stories);
}
