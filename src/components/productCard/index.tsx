import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import {debounce} from 'lodash';
import {Product} from '@app/types/product';
import {Pressable, StyleSheet} from 'react-native';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import {pushToScreen} from '@app/navigation';

import ProductCardContext from './ProductCardContext';
import ProductCardImage from './ProductCardImage';
import ProductCardTitle from './ProductCardTitle';
import ProductCardRating from './ProductCardRating';
import ProductCardActions, {ProductAddButton, ProductCardBookmark} from './ProductCardActions';
import ProductPrice from './ProductPrice';
import ProductCardContent from './ProductCardContent';

type Props = {
  product: Product;
  index: number;
  children?: React.ReactNode[];
};

const ProductCard = ({product, index = 1, children}: Props) => {
  const translateTheta = useSharedValue(50);
  const opacityTheta = useSharedValue(0);
  useEffect(() => {
    translateTheta.value = withDelay(index * 100, withTiming(0, {duration: 500}));
    opacityTheta.value = withDelay(index * 100, withTiming(1, {duration: 500}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityTheta.value,
    transform: [{translateY: translateTheta.value}],
  }));

  const navigateToDetails = debounce(
    () => {
      pushToScreen('ProductDetailsScreen', product);
    },
    1000,
    {
      leading: true,
      trailing: false,
    },
  );

  return (
    <ProductCardContext.Provider value={{product}}>
      <Animated.View style={animatedStyle}>
        <Pressable testID={'verticle_card_' + index} onPress={navigateToDetails} style={styles.container}>
          {children}
        </Pressable>
      </Animated.View>
    </ProductCardContext.Provider>
  );
};

export default ProductCard;

ProductCard.Title = ProductCardTitle;
ProductCard.Image = ProductCardImage;
ProductCard.Rating = ProductCardRating;
ProductCard.Actions = ProductCardActions;
ProductCard.Price = ProductPrice;
ProductCard.Content = ProductCardContent;
ProductCard.AddButton = ProductAddButton;
ProductCard.Bookmark = ProductCardBookmark;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(screenWidth / 2 - 32),
    margin: moderateScale(4),
    borderRadius: moderateScale(10),
    backgroundColor: COLOR.white,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
