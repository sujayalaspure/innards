import {pushToScreen} from '@app/navigation';
import {
  addProductToCart,
  useProductSelector,
} from '@app/redux/reducers/productSlice';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {Product} from '@app/types/product';

const useProduct = (product: Product) => {
  const {cart} = useAppSelector(useProductSelector);
  const dispatch = useAppDispatch();

  const {id, price, discountPercentage} = product;

  const isInCart = cart.find(item => item.id === id);

  const num = parseFloat(price?.toString().replace(/,/g, ''));
  const discountedPrice =
    num - (num * parseFloat(discountPercentage?.toString() || '0')) / 100;

  const differenceAmount = num - discountedPrice;

  const onChangeQuantity = (value: number) => {
    dispatch(
      addProductToCart({
        ...product,
        quantity: value,
        price: num,
      }),
    );
  };

  const navigateToDetails = () => {
    pushToScreen('ProductDetailsScreen', product);
  };

  return {
    isAddedToCart: isInCart,
    discountedPrice,
    differenceAmount,
    onChangeQuantity,
    navigateToDetails,
  };
};

export default useProduct;
