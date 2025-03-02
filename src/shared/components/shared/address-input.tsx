'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  //решаем ошибку в консоли с aria-owns
  //Ошибка связана с несоответствием атрибута aria-owns между
  //серверным рендерингом (SSR) и клиентским рендерингом (CSR).
  //Это происходит потому, что react-dadata использует динамически
  //  сгенерированные идентификаторы, которые могут отличаться на сервере и клиенте.

  //Как исправить
  //Отключить SSR для этого компонента
  //В Next.js можно обернуть компонент AdressInput в useEffect, чтобы он рендерился только на клиенте
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Не рендерим на сервере
  //конец решения с ошибкой aria-owns

  return (
    <AddressSuggestions
      token="b5b8bb983ddcd08648080e0271d9dd367bb7aa65"
      onChange={data => onChange?.(data?.value)}
    />
  );
};
