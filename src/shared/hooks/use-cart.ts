import React from 'react';
import { useCartStore } from '../store';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(state => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};

//!! на память об ошибке с массивом!!
// const [totalAmount, items, fetchCartItems] = useCartStore(state => [state.totalAmount, state.items, state.fetchCartItems]); //валит проект! но у автора так работало!!
// а вот так можно
// const totalAmount = useCartStore(state => state.totalAmount);
// const items = useCartStore(state => state.items);
// const fetchCartItems = useCartStore(state => state.fetchCartItems);
//вот так работает
// const { totalAmount, items, fetchCartItems, updateItemQuantity } =
//   useCartStore();
//еще правильнее
// const { totalAmount, items, fetchCartItems, updateItemQuantity } =
//   useCartStore(
//     useShallow(state => ({
//       totalAmount: state.totalAmount,
//       items: state.items,
//       fetchCartItems: state.fetchCartItems,
//       updateItemQuantity: state.updateItemQuantity,
//     }))
//   );
//и даже массивом, но только с useShallow!!
// вот это рабочий вариант!
//   const [
//     totalAmount,
//     items,
//     fetchCartItems,
//     updateItemQuantity,
//     removeCartItem,
//   ] = useCartStore(
//     useShallow(state => [
//       state.totalAmount,
//       state.items,
//       state.fetchCartItems,
//       state.updateItemQuantity,
//       state.removeCartItem,
//     ])
//   );
