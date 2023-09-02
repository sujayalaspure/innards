import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import StarRating from '@app/components/atoms/StarRating';
import {Product} from '@app/types/product';
import CountButton from '@app/components/atoms/CountButton';
import useProduct from '@app/hooks/useProduct';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated';

interface Props {
  product: Product;
  index?: number;
}

const ProductCardVerticle = ({product, index = 1}: Props) => {
  const translateTheta = useSharedValue(50);
  const opacityTheta = useSharedValue(0);

  const {title, price, rating, thumbnail} = product;
  const [thumbImage, setThumbImage] = useState(thumbnail);

  const {isAddedToCart, onChangeQuantity, navigateToDetails} = useProduct(product);

  useEffect(() => {
    translateTheta.value = withDelay(index * 100, withTiming(0, {duration: 500}));
    opacityTheta.value = withDelay(index * 100, withTiming(1, {duration: 500}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityTheta.value,
    transform: [{translateY: translateTheta.value}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable testID={'verticle_card_' + index} onPress={navigateToDetails} style={styles.container}>
        <View style={styles.thumbnail}>
          <Image
            resizeMode="cover"
            style={styles.image}
            onError={() => {
              setThumbImage('https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg');
            }}
            source={{uri: thumbImage}}
          />
        </View>
        <View style={styles.content}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.heading}>
            {title}
          </Text>
          <StarRating rating={rating} />
          <View style={styles.actionsWrapper}>
            <Text style={styles.price}>₹ {parseInt(price?.toString().replace(/,/g, ''), 10)}</Text>
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
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ProductCardVerticle;

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
  thumbnail: {
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  image: {
    height: screenWidth / 2 - 32,
    width: screenWidth / 2 - 32,

    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    aspectRatio: 1 / 1,
  },
  content: {
    flex: 1,
    padding: moderateScale(8),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '500',
    flex: 1,
    color: COLOR.black,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(4),
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLOR.black,
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
