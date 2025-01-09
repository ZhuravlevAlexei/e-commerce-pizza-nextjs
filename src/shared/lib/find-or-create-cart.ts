import { prisma } from '@/prisma-setup/prisma-client';

export const findOrCreateCart = async (token: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      token: token,
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token: token,
      },
    });
  }
  return userCart;
};
