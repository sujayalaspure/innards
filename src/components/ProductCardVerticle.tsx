import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import StarRating from '@app/components/atoms/StarRating';
import {Product} from '@app/types/product';
import {pushToScreen} from '@app/navigation';

interface Props extends Product {
  onActionPress: (t: string | number) => void;
  onLongPress?: (data: any) => void;
}

const ProductCardVerticle = ({
  id,
  title,
  price,
  rating,
  onActionPress,
  thumbnail,
  onLongPress,
  ...props
}: Props) => {
  const longPressHandler = (data: any) => {
    pushToScreen('ProductDetailsScreen', data);

    if (onLongPress) {
      // onLongPress(data);
    }
  };
  return (
    <Pressable
      onLongPress={() =>
        longPressHandler({
          title,
          price,
          rating,
          thumbnail,
          id,
          ...props,
        })
      }
      style={styles.container}>
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
          <Text style={styles.price}>₹ {parseInt(price.toString(), 10)}</Text>
          <Pressable
            style={styles.actionButton}
            onPress={() => onActionPress(id)}>
            <Icon name="plus" size={20} color={COLOR.white} />
          </Pressable>
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
