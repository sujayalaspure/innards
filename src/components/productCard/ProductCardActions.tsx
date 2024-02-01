import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import {CountButton} from '@app/components/atoms';
import COLOR from '@app/theme/COLOR';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useProductCardContext} from './ProductCardContext';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {toggleBookMark, useBookmarkSelector} from '@app/redux/reducers/bookmarkSlice';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
};

const ProductCardActions = ({children}: Props) => {
  return <View style={styles.actionsWrapper}>{children}</View>;
};

export const ProductCardBookmark = () => {
  const {product} = useProductCardContext();
  const dispatch = useAppDispatch();
  const {bookmarks} = useAppSelector(useBookmarkSelector);
  const isBookmarked = bookmarks.some(item => item.id === product.id);
  const favScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: withSpring(favScale.value)}],
  }));

  const onFavPress = () => {
    dispatch(toggleBookMark(product));
    favScale.value = 0.8;
    setTimeout(() => {
      favScale.value = 1;
    }, 200);
  };

  // const AnimatedPressable = createAnimatedComponent(Pressable);

  return (
    <Pressable onPress={onFavPress}>
      <Animated.View style={[styles.actionButton, styles.bookmark, animatedStyle]}>
        <Icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color={COLOR.accent} />
      </Animated.View>
    </Pressable>
  );
};

export const ProductAddButton = () => {
  const {isAddedToCart, onChangeQuantity} = useProductCardContext();

  return (
    <>
      {!isAddedToCart ? (
        <Pressable style={styles.actionButton} onPress={() => onChangeQuantity(1)}>
          <Icon name="plus" size={20} color={COLOR.white} />
        </Pressable>
      ) : (
        <CountButton
          count={isAddedToCart.quantity}
          onChange={count => {
            onChangeQuantity(count - isAddedToCart.quantity);
          }}
        />
      )}
    </>
  );
};

export default ProductCardActions;

const styles = StyleSheet.create({
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(4),
    // gap: moderateScale(4),
  },
  bookmark: {
    backgroundColor: COLOR.white,
  },
  actionButton: {
    backgroundColor: COLOR.primary,
    padding: moderateScale(4),
    borderRadius: moderateScale(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
