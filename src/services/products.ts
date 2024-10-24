import { Product } from '@prisma/client';
import { axiosInstance } from './axios-instance';
import { ApiRouts } from './constants';

export const search = async (query: string): Promise<Product[]> => {
  //short & best
  return (
    await axiosInstance.get<Product[]>(ApiRouts.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data;

  //full text
  //   const { data } = await axiosInstance.get<Product>('/products/search', {
  //     params: { query },
  //   });

  //     return data;

  //base variant? i didn't try it
  // const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/products/search?query=${query}`
  // );
  // const data = await response.json();
  // return data;
};
