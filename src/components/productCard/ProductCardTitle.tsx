import {Text} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';
import {StyleSheet} from 'react-native';
import {useProductCardContext} from './ProductCardContext';

const ProductCardTitle = () => {
  const {product} = useProductCardContext();
  return (
    <Text ellipsizeMode="tail" numberOfLines={2} style={styles.heading}>
      {product.title}
    </Text>
  );
};

export default ProductCardTitle;

const styles = StyleSheet.create({
  heading: {
    fontWeight: '500',
    flex: 1,
    color: COLOR.black,
  },
});
