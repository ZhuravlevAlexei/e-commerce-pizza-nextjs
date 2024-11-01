import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { pizzaSizes } from '@/shared/constants/pizza';

interface ChoosePizzaForm {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;

  //   ingredients: IProduct['ingredients'];
  //   items?: IProduct['items'];
}

export const ChoosePizzaForm: React.FC<ChoosePizzaForm> = ({
  name,
  // items,
  imageUrl,
  // ingredients,
  // onClickAdd,
  className,
}) => {
  const textDetails = '30 см, традиционное тесто 30';
  const totalPrice = 350;
  const size = 30;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <GroupVariants items={pizzaSizes} />

        <Button
          // loading={loading}
          // onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
