import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import {useProductCardContext} from '@app/components/productCard/ProductCardContext';

const ProductPrice = () => {
  const {product} = useProductCardContext();

  return <Text style={styles.price}>₹ {parseInt(product.price?.toString().replace(/,/g, ''), 10)}</Text>;
};

export default ProductPrice;

const styles = StyleSheet.create({
  price: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLOR.black,
    flex: 1,
  },
});
