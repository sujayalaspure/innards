import useProduct from '@app/hooks/useProduct';
import {Product} from '@app/types/product';
import {createContext, useContext} from 'react';

const ProductCardContext = createContext<{product: Product} | null>(null);

export const useProductCardContext = () => {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error('useProductCardContext must be used within a ProductCardContextProvider');
  }
  const {isAddedToCart, onChangeQuantity, navigateToDetails} = useProduct(context.product);

  return {
    isAddedToCart,
    onChangeQuantity,
    navigateToDetails,
    ...context,
  };
};

export default ProductCardContext;
