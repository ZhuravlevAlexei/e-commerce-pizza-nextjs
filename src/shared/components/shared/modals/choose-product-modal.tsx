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
import { ProductWithRelations } from '@/types-setup/prisma';
import { ProductForm } from '../product-form';

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
  product,
  className,
}) => {
  const router = useRouter();

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
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
