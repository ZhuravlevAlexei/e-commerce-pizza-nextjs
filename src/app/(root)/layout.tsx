import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/shared/components/shared/header';

export const metadata: Metadata = {
  title: 'Pizza Shop',
  description: 'Pizza Shop Pet Project - best pizza in the world',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        {/* Suspense нужен т.к. внутри хедера пользуемся useSerchParams  */}
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
