'use client';

import React from 'react';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';

interface CartButtonProps {
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ className }) => {
  const [totalAmount, items, loading] = useCartStore(
    useShallow(state => [state.totalAmount, state.items, state.loading])
  );
  return (
    <CartDrawer>
      <Button
        loading={loading}
        // className={cn(
        //   'group relative w-[129px]',
        //   { 'w-[129px]': loading },
        //   className
        // )} //кнопка фиксированных размеров, не скачет в зависимости от свойства loading
        className={cn('group relative', { 'w-[105px]': loading }, className)}
      >
        {/* <b>{totalAmount} ₴</b> */}
        <b>{totalAmount ? `${totalAmount} ₴` : ''}</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
          {/* <ShoppingCart size={16} className=" relative" strokeWidth={2} />  к сведению! это тот же размер что и 'h-4 w-4':-) */}
          {/* <b>{items.length}</b> */}
          <b>{items.length ? `${items.length}` : ''}</b>
        </div>
        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};
