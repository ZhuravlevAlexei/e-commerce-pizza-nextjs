import { CartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (items: CartItemDTO): number => {
  const ingredientsPrice = items.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (items.productItem.price + ingredientsPrice) * items.quantity;
};
