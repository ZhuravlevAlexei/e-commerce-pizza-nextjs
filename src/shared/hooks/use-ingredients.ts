import React from 'react';
import { Api } from '@/shared/services/api-client';
import { Ingredient } from '@prisma/client';

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);

        //if not sorted by prisma
        // .findMany({
        //   orderBy: {
        //     name: 'asc',
        //   },
        // });
        //we can do it locally...
        //   setIngredients(
        //     ingredients.sort((a, b) => a.name.localeCompare(b.name))
        //   );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
  };
};
