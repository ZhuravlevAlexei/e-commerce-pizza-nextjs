'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface CategoriesProps {
  items: Category[];
  className?: string;
}

// const cats = [  //OLD used to be used for th first version
//   { id: 1, name: 'Пиццы' },
//   { id: 2, name: 'Комбо' },
//   { id: 3, name: 'Закуски' },
//   { id: 4, name: 'Коктейли' },
//   { id: 5, name: 'Кофе' },
//   { id: 6, name: 'Напитки' },
//   { id: 7, name: 'Десерты' },
// ];

export const Categories: React.FC<CategoriesProps> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore(state => state.activeId);
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {items.map(({ name, id }, index) => (
        <a
          key={index}
          href={`/#${name}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
