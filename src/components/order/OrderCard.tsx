import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {Order} from '@app/types/order';
import Card from '@app/components/atoms/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import StarRating from '@app/components/atoms/StarRating';
import LinkNIcon from '@app/components/atoms/LinkNIcon';
import {useAppDispatch} from '@app/redux/reduxHook';
import {addProductToCart} from '@app/redux/reducers/productSlice';
import {navigateToScreen} from '@app/navigation';

interface Props extends Order {
  onPress?: () => void;
}

const OrderCard = ({products, status, total, createdAt, onPress, rating}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Card isShadow>
        <View style={styles.headerWrapper}>
          <View style={styles.statusIcon}>
            <Icon name="check" size={30} color={COLOR.primary} />
          </View>
          <View style={styles.flex1}>
            <Text>
              Status: <Text style={styles.textBold}>{status?.toUpperCase()}</Text>
            </Text>
            <Text>
              {total.toFixed(2)} • {new Date(createdAt).toLocaleString()}
            </Text>
          </View>
          <Icon name="arrow-right" size={30} color={COLOR.black} />
        </View>
        <View style={styles.productThumbnailWrapper}>
          {products.slice(0, 5).map(product => (
            <Image
              key={product.id}
              source={{uri: product.thumbnail}}
              style={styles.productThumbnail}
              resizeMode="cover"
            />
          ))}
          {products.length > 5 && (
            <View style={[styles.productThumbnail, styles.extraProductPlaceholder]}>
              <Text style={styles.textBold}>+{products.length - 5}</Text>
            </View>
          )}
        </View>
        <View style={styles.ratingWrapper}>
          <Text>Rate your Order</Text>
          <StarRating rating={rating} />
        </View>
        <View style={styles.reorderLink}>
          <LinkNIcon
            text="Order again"
            color={COLOR.primaryDark}
            onPress={() => {
              products.forEach(product => dispatch(addProductToCart(product)));
              navigateToScreen('CartScreen');
            }}
          />
        </View>
      </Card>
    </Pressable>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusIcon: {
    height: 50,
    width: 50,
    borderRadius: 8,
    backgroundColor: COLOR.gradientColor2 + '55',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  productThumbnailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // justifyContent: 'space-between',
  },
  productThumbnail: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  extraProductPlaceholder: {
    backgroundColor: COLOR.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  reorderLink: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopColor: COLOR.lightGray,
    borderTopWidth: 1,
  },
  flex1: {
    flex: 1,
  },
});
