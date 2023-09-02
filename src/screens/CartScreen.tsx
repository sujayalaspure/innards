import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useRef} from 'react';

import HeaderBar from '@app/components/atoms/HeaderBar';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import ProductCardHorizontal from '@app/components/ProductCardHorizontal';
import {moderateScale, screenHeight} from '@app/utils/scaling_unit';
import {SpacerH140, SpacerH20} from '@app/components/atoms/Separator';
import EmptyCartView from '@app/components/cart/EmptyCartView';
import BottomActions from '@app/components/cart/BottomActions';
import {navigateToScreen, setShowBottomBar} from '@app/navigation';
import {useIsFocused} from '@react-navigation/native';
import {addOrUpdateCurrentOrder} from '@app/redux/reducers/orderSlice';
import {formatNumber, generateUUID} from '@app/utils/commonFunctions';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import COLOR from '@app/theme/COLOR';
import BillingDetails from '@app/components/order/BillingDetails';

const CartScreen = () => {
  const sheetRef = useRef<BottomSheetRef>(null);

  const {cart} = useAppSelector(useProductSelector);
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();

  let billing = {
    mrp: 0,
    discount: 0,
    tax: 0,
    shipping: 0,
    totalItems: 0,
    total: 0,
  };

  billing = cart.reduce((acc, item) => {
    const disc =
      acc.discount +
      (parseInt(item.price.toString(), 10) - item.finalPrice) * item.quantity;
    return {
      ...acc,
      mrp: formatNumber(acc.mrp + Number(item.price) * item.quantity),
      totalItems: acc.totalItems + item.quantity,
      discount: formatNumber(disc),
      tax: formatNumber(0.18 * acc.total),
      total: formatNumber(acc.total + item.finalPrice * item.quantity),
    };
  }, billing);

  useEffect(() => {
    if (isFocus) {
      setShowBottomBar(true, 'CartScreen');
    }
  }, [isFocus]);

  const onPlaceOrder = async () => {
    console.log('onPlaceOrder', cart);
    await dispatch(
      addOrUpdateCurrentOrder({
        id: generateUUID(),
        products: cart,
        total: totalPrice,
        createdAt: new Date().getTime(),
      }),
    );
    navigateToScreen('CheckoutScreen', {
      totalPrice: totalPrice,
      billing,
    });
  };

  const totalPrice = billing?.total + billing?.tax + billing?.shipping || 0;

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
            ListFooterComponent={SpacerH140()}
            showsVerticalScrollIndicator={false}
          />
          <BottomActions
            price={billing.total + billing.tax + billing.shipping}
            onPlaceOrder={onPlaceOrder}
            onDetailsPressed={() => {
              sheetRef.current?.scrollTo(screenHeight / 3);
            }}
          />
          <View />
        </View>
      )}
      <BottomSheet showBackdrop ref={sheetRef}>
        <View style={styles.billingDetails}>
          <BillingDetails billing={billing} />
        </View>
      </BottomSheet>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 10,
  },
  billingDetails: {
    paddingHorizontal: 20,
  },
});
