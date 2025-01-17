'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface CartDrawerProps {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<CartDrawerProps>> = ({
  // className,
  children,
}) => {
  //!! на память об ошибке с массивом!!
  // const [totalAmount, items, fetchCartItems] = useCartStore(state => [state.totalAmount, state.items, state.fetchCartItems]); //валит проект! но у автора так работало!!
  // а вот так можно
  // const totalAmount = useCartStore(state => state.totalAmount);
  // const items = useCartStore(state => state.items);
  // const fetchCartItems = useCartStore(state => state.fetchCartItems);
  //вот так работает
  // const { totalAmount, items, fetchCartItems, updateItemQuantity } =
  //   useCartStore();
  //еще правильнее
  // const { totalAmount, items, fetchCartItems, updateItemQuantity } =
  //   useCartStore(
  //     useShallow(state => ({
  //       totalAmount: state.totalAmount,
  //       items: state.items,
  //       fetchCartItems: state.fetchCartItems,
  //       updateItemQuantity: state.updateItemQuantity,
  //     }))
  //   );
  //и даже массивом, но только с useShallow!!
  const [
    totalAmount,
    items,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
  ] = useCartStore(
    useShallow(state => [
      state.totalAmount,
      state.items,
      state.fetchCartItems,
      state.updateItemQuantity,
      state.removeCartItem,
    ])
  );

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    // console.log(id, quantity, type);
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
          <VisuallyHidden.Root>
            <SheetDescription>Итого: {totalAmount} ₴</SheetDescription>
          </VisuallyHidden.Root>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {items.map(item => (
            <div key={item.id} className="mb-2">
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )
                    : ''
                }
                disabled={item.disabled}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={type =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => {
                  removeCartItem(item.id);
                }}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₴</span>
            </div>
            <Link href="/checkout">
              <Button
                // onClick={() => setRedirecting(true)}
                // loading={redirecting}
                type="submit"
                className="w-full h-12 text-base"
              >
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
