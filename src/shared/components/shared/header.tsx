'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from './container';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { cn } from '@/shared/lib/utils';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals/auth-modal/auth-modal';

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
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage =
        'Заказ успешно оплачен! Информация отправлена на почту ( OFF: пока отправка не реализована).';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Регистрация аккаунта успешно завершена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        //без таймаута тостер не отрабатывает, подумать, возможно ему нужна пауза?
        toast.success(toastMessage, { duration: 3000 });
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
          <AuthModal
            open={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
            }}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
