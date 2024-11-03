import React from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  React.useEffect(() => {
    //we form query string
    const params = {
      ...filters.prices,
      sizes: Array.from(filters.sizes),
      pizzaTypes: Array.from(filters.pizzaTypes),
      ingredients: Array.from(filters.selectedIngredients),
    };
    //(test the string)
    // console.log(qs.stringify(params, { arrayFormat: 'comma' }));
    const query = qs.stringify(params, { arrayFormat: 'comma' });

    //and set it in url
    router.push(`?${query}`, { scroll: false });
  }, [filters, router]);
};
