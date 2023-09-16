import {View, StyleSheet, FlatList} from 'react-native';
import React, {useRef} from 'react';

import HeaderBar from '@app/components/atoms/HeaderBar';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import ProductCardHorizontal from '@app/components/ProductCardHorizontal';
import {moderateScale, screenHeight} from '@app/utils/scaling_unit';
import {SpacerH140, SpacerH20} from '@app/components/atoms/Separator';
import EmptyCartView from '@app/components/cart/EmptyCartView';
import BottomActions from '@app/components/cart/BottomActions';
import {navigateToScreen} from '@app/navigation';
import {addOrUpdateCurrentOrder} from '@app/redux/reducers/orderSlice';
import {formatNumber, generateUUID} from '@app/utils/commonFunctions';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import COLOR from '@app/theme/COLOR';
import BillingDetails from '@app/components/order/BillingDetails';
import useBottomBar from '@app/hooks/useBottomBar';
import {Logger} from '@app/utils/Logger';

const CartScreen = () => {
  const sheetRef = useRef<BottomSheetRef>(null);

  const {cart} = useAppSelector(useProductSelector);

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
    const disc = acc.discount + (parseInt(item.price.toString(), 10) - item.finalPrice) * item.quantity;
    return {
      ...acc,
      mrp: formatNumber(acc.mrp + Number(item.price) * item.quantity),
      totalItems: acc.totalItems + item.quantity,
      discount: formatNumber(disc),
      tax: formatNumber(0.18 * acc.total),
      total: formatNumber(acc.total + item.finalPrice * item.quantity),
    };
  }, billing);

  useBottomBar(true, 'CartScreen');

  const onPlaceOrder = async () => {
    Logger.log('onPlaceOrder', cart);
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
            testID="cart_bottom_actions"
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
    backgroundColor: COLOR.white,
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
