'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/types-setup/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
  product,
  className,
}) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <VisuallyHidden.Root>
          <DialogTitle>dialog title to hide</DialogTitle>
          <DialogDescription>dialog description to hide</DialogDescription>
        </VisuallyHidden.Root>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
