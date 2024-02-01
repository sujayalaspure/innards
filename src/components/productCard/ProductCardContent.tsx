import {View, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';

type Props = {
  children: React.ReactNode;
};

const ProductCardContent = ({children}: Props) => {
  return <View style={styles.content}>{children}</View>;
};

export default ProductCardContent;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: moderateScale(8),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
