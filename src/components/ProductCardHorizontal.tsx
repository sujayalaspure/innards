import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Product} from '@app/types/product';
import {moderateScale} from '@app/utils/scaling_unit';
import CountButton from '@app/components/atoms/CountButton';
import LinkNIcon from '@app/components/atoms/LinkNIcon';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';
import {useAppDispatch} from '@app/redux/reduxHook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {removeProductFromCart} from '@app/redux/reducers/productSlice';
import useProduct from '@app/hooks/useProduct';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import {translate} from '@app/i18n/translate';

type Props = {
  product: Product;
  inView?: 'listScreen' | 'cartScreen';
  index?: number;
};

const ProductCardHorizontal = ({product, inView = 'cartScreen', index = 1}: Props) => {
  const [contentHeight, setContentHeight] = useState(150);
  const [thumbImage, setThumbImage] = useState(product?.thumbnail);

  const translateTheta = useSharedValue(50);
  const opacityTheta = useSharedValue(0);

  const dispatch = useAppDispatch();

  const {isAddedToCart, discountedPrice, differenceAmount, onChangeQuantity, navigateToDetails} = useProduct(product);

  useEffect(() => {
    translateTheta.value = withDelay(index * 100, withTiming(0, {duration: 500}));
    opacityTheta.value = withDelay(index * 100, withTiming(1, {duration: 500}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityTheta.value,
    transform: [{translateY: translateTheta.value}],
  }));

  return (
    <Animated.View testID="product_horizontal_card" style={animatedStyle}>
      <Pressable onPress={navigateToDetails} style={[styles.container, styles.shadow]}>
        <View style={styles.thumbnailWrapper}>
          <Image
            onError={() => {
              setThumbImage('https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg');
            }}
            source={{uri: thumbImage}}
            style={[styles.image, {height: contentHeight}]}
            resizeMode="cover"
          />
        </View>
        <View
          style={styles.contentWrapper}
          onLayout={event => {
            setContentHeight(event.nativeEvent.layout.height);
          }}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.subHeading}>{product.brand}</Text>
          {differenceAmount > 0 && (
            <View style={styles.row}>
              <Text style={styles.strikedPrice}>₹ {product.price}</Text>
              <Text style={styles.savings}>
                {translate('you_save').replace(
                  '%n',
                  (differenceAmount * (isAddedToCart?.quantity || 1)).toFixed(2).toString(),
                )}
              </Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.price}>₹ {discountedPrice}</Text>
            <Text style={styles.subHeading}>{translate('deliver_in_days').replace('%n', '10')}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            {isAddedToCart ? (
              <CountButton
                count={isAddedToCart.quantity}
                onChange={count => {
                  onChangeQuantity(count - isAddedToCart.quantity);
                }}
              />
            ) : (
              <Pressable style={styles.actionButton} onPress={() => onChangeQuantity(1)}>
                <Icon name="plus" size={20} color={COLOR.white} />
              </Pressable>
            )}
            {inView === 'cartScreen' && (
              <LinkNIcon
                text={translate('remove')}
                iconName="trash-can"
                onPress={() => {
                  dispatch(removeProductFromCart(product.id));
                }}
                color={COLOR.accent}
              />
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ProductCardHorizontal;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    width: '100%',
    backgroundColor: COLOR.white,
    // padding: moderateScale(6),
    flexDirection: 'row',
    borderRadius: SIZE.radius,
  },
  thumbnailWrapper: {
    flex: 0.4,
    marginRight: moderateScale(10),
    overflow: 'hidden',
    borderTopLeftRadius: SIZE.radius,
    borderBottomLeftRadius: SIZE.radius,
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
  },
  contentWrapper: {
    flex: 0.6,
    padding: moderateScale(6),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLOR.black,
  },
  strikedPrice: {
    textDecorationLine: 'line-through',
    fontSize: moderateScale(20),
    color: COLOR.gray,
    fontWeight: '300',
  },
  savings: {
    fontSize: moderateScale(14),
    color: COLOR.primaryDark,
    marginLeft: moderateScale(10),
    fontWeight: '700',
  },
  price: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: COLOR.black,
    marginRight: moderateScale(10),
  },
  subHeading: {
    fontSize: moderateScale(12),
    color: COLOR.gray,
    flexShrink: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScale(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(3),
  },
  actionButton: {
    backgroundColor: COLOR.primary,
    padding: moderateScale(6),
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
