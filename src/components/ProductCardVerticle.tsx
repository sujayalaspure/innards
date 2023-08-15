import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import StarRating from '@app/components/atoms/StarRating';
import {Product} from '@app/types/product';
import CountButton from '@app/components/atoms/CountButton';
import useProduct from '@app/hooks/useProduct';

interface Props {
  product: Product;
}

const ProductCardVerticle = ({product}: Props) => {
  const {title, price, rating, thumbnail} = product;

  const {isAddedToCart, onChangeQuantity, navigateToDetails} =
    useProduct(product);

  return (
    <Pressable onPress={navigateToDetails} style={styles.container}>
      <View style={styles.thumbnail}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: thumbnail}}
        />
      </View>
      <View style={styles.content}>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.heading}>
          {title}
        </Text>
        <StarRating rating={rating} />
        <View style={styles.actionsWrapper}>
          <Text style={styles.price}>
            ₹ {parseInt(price.toString().replace(/,/g, ''), 10)}
          </Text>
          {!isAddedToCart ? (
            <Pressable
              style={styles.actionButton}
              onPress={() => onChangeQuantity(1)}>
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
