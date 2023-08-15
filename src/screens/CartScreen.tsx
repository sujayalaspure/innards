import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import React from 'react';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {useAppSelector} from '@app/redux/reduxHook';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import ProductCardHorizontal from '@app/components/ProductCardHorizontal';
import {moderateScale} from '@app/utils/scaling_unit';
import {SpacerH20, SpacerH70} from '@app/components/atoms/Separator';
import {emptyCartImage} from '@app/assets/images';
import COLOR from '@app/theme/COLOR';
import Button from '@app/components/atoms/Button';
import {navigateToScreen} from '@app/navigation';

const CartScreen = () => {
  const {cart} = useAppSelector(useProductSelector);

  return (
    <>
      <HeaderBar showBackButton title={'Cart'} />
      {cart.length === 0 && <EmptyCartView />}
      {cart.length > 0 && (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{paddingHorizontal: moderateScale(14)}}
            data={cart}
            renderItem={({item}) => <ProductCardHorizontal product={item} />}
            keyExtractor={item => item?.id?.toString()}
            ItemSeparatorComponent={SpacerH20}
            ListHeaderComponent={SpacerH20}
            ListFooterComponent={SpacerH70}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};

export default CartScreen;

const EmptyCartView = () => (
  <View style={styles.emptyCartImage}>
    <Image source={emptyCartImage} resizeMode="cover" style={styles.image} />
    <Text style={styles.emptyCartTitle}>Looks like your cart is Empty</Text>
    <Text style={styles.emptyCartSubText}>
      Check our bestsellers and find something for you
    </Text>
    <Button
      variant="secondary"
      onPress={() => navigateToScreen('HomeScreen')}
      style={styles.button}
      title="Shop Now"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyCartImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  emptyCartTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
  },
  emptyCartSubText: {
    fontSize: moderateScale(16),
    color: COLOR.gray,
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
  },
  button: {
    flex: 0,
    width: '80%',
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(50),
  },
});
