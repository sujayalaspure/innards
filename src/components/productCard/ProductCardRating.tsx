import React from 'react';
import {StarRating} from '@app/components/atoms';
import {useProductCardContext} from '@app/components/productCard/ProductCardContext';

const ProductCardRating = () => {
  const {product} = useProductCardContext();

  return <StarRating rating={product.rating} />;
};

export default ProductCardRating;
