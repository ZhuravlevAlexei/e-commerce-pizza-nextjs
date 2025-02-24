'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/prisma-setup/prisma-client';
import { CheckoutFormValues } from '@/shared/constants';
import { OrderStatus } from '@prisma/client';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token is not found');
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзина не найдена возвращаем ошибку */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* Если корзина пустая возвращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину */
    /* обнуляем сумму */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    /* и удаляем связанные с корзиной товары */
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    //TODO: отослать письмо со ссылкой на оплату клиенту
    // пока не делаю, сервис ReSend, используемый автором,
    // мне не подходит

    //TODO: сделать переход на страницу оплаты
    // пока не делаю, сервис ЮKassa (yookassa), используемый автором,
    // мне не подходит

    //пока формируем абстракные данные и возвращаем абстракную ссылку
    const paymentData = {
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
      paymentUrl: 'https://google.com',
    };
    return paymentData.paymentUrl;
  } catch (err) {
    console.log('err: ', err);
  }
}

//тестирование было такое
// export async function createOrder(data: CheckoutFormValues) {
//   console.log(data);

//   const token = '123';

//   await prisma.order.create({
//     data: {
//       token: token,
//       totalAmount: 1500,
//       status: OrderStatus.PENDING,
//       items: [],
//       fullName: data.firstName + ' ' + data.lastName,
//       email: data.email,
//       phone: data.phone,
//       address: data.address,
//       comment: data.comment,
//     },
//   });
// типа переход на страницу оплаты, но ее еще нету, ну пока на гугл
//   return 'https://google.com';
// }
