import React from 'react';
import {Product} from '@app/types/product';
import ProductCard from '@app/components/productCard';
import {Separator} from '@app/components/atoms';

interface Props {
  product: Product;
  index?: number;
}

const ProductCardVerticle = ({product, index = 1}: Props) => {
  return (
    <ProductCard product={product} index={index}>
      <ProductCard.Image />
      <ProductCard.Content>
        <ProductCard.Title />
        <ProductCard.Rating />
        <ProductCard.Actions>
          <ProductCard.Price />
          <ProductCard.Bookmark />
          <Separator width={4} />
          <ProductCard.AddButton />
        </ProductCard.Actions>
      </ProductCard.Content>
    </ProductCard>
  );
};

export default ProductCardVerticle;
