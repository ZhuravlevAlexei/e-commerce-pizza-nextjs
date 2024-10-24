import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import React from 'react';

interface FilterIngredientsProps {
  ingredients: Ingredient[];
}

export const useFilterIngredients = (): FilterIngredientsProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
        //   setIngredients(
        //     ingredients.sort((a, b) => a.name.localeCompare(b.name))
        //   );
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients };
};
