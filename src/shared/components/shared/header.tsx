'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { User } from 'lucide-react';
import { Button } from '../ui';
import { Container } from './container';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { cn } from '@/shared/lib/utils';
import toast from 'react-hot-toast';

interface HeaderProps {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const searchParams = useSearchParams();
  React.useEffect(() => {
    console.log(searchParams.has('paid'), searchParams);
    if (searchParams.has('paid')) {
      setTimeout(() => {
        //без таймаута тостер не отрабатывает, подумать, возможно ему нужна пауза?
        toast.success(
          'Заказ успешно оплачен! Информация отправлена на почту ( OFF: пока отправка не реализована).'
        );
      }, 500);
    }
  }, [searchParams]);
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href={'/'}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Pizza Shop</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
