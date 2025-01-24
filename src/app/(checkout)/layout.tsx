import { Container, Header } from '@/shared/components/shared';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Next Pizza | Корзина',
  description: 'Checkout (корзина заказа) layout for Next Pizza Shop',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header
          hasSearch={false}
          hasCart={false}
          className="border-b-gray-200"
        />
        {children}
      </Container>
    </main>
  );
}
