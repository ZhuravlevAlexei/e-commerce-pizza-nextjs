import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/**
 * Calculate total price of the pizza with selected ingredients.
 * @param type Dought type of pizza. (тип теста - традиционное 1 и традиционное 2)
 * @param size Size of pizza.
 * @param items All available product items. (вариации пиццы)
 * @param ingredients All available ingredients.
 * @param selectedIngredients Set of selected ingredients' id.
 * @returns number Total price of the pizza with selected ingredients.
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find(item => item.pizzaType === type && item.size === size)?.price ||
    0;
  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  return pizzaPrice + totalIngredientsPrice;
};
