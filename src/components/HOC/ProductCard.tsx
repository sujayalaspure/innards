import {pushToScreen} from '@app/navigation';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import {useAppSelector} from '@app/redux/reduxHook';
import {CartItem, Product} from '@app/types/product';
import React, {FC, useEffect, useState} from 'react';

const ProductCard = (Component: FC<any>) => {
  const {cart} = useAppSelector(useProductSelector);
  const [isAddedToCart, setIsAddedToCart] = useState<CartItem | undefined>(
    undefined,
  );
  let id = 0;
  useEffect(() => {
    const isInCart = cart.find(item => item.id === id);
    setIsAddedToCart(isInCart);
  }, [id]);

  const cardPressHandler = (data: Product) => {
    pushToScreen('ProductDetailsScreen', data);
  };
  return (props: any) => {
    id = props?.product?.id;
    return (
      <Component
        {...props}
        onCardPress={cardPressHandler}
        isAddedToCart={isAddedToCart}
      />
    );
  };
};

export default ProductCard;
