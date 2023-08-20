import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useRef} from 'react';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {useRoute, RouteProp, useIsFocused} from '@react-navigation/native';
import {Order} from '@app/types/order';
import {StyleSheet} from 'react-native';
import Card from '@app/components/atoms/Card';
import COLOR from '@app/theme/COLOR';
import Separator, {SpacerH20} from '@app/components/atoms/Separator';
import {RenderAddress} from '@app/components/checkout/AddressView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@app/components/atoms/Button';
import {navigateToScreen, setShowBottomBar} from '@app/navigation';
import {addProductToCart} from '@app/redux/reducers/productSlice';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {
  formatDate,
  getDifferenceInDays,
  toTitleCase,
} from '@app/utils/commonFunctions';
import {updateOrder, useOrderSelector} from '@app/redux/reducers/orderSlice';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import {screenHeight} from '@app/utils/scaling_unit';
import HelpSheet from '@app/components/order/HelpSheet';
import InfoText from '@app/components/order/InfoText';
import BillingDetails from '@app/components/order/BillingDetails';

type ParamList = {
  Params: Order;
};

const OrderSummaryScreen = () => {
  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const sheetRef = useRef<BottomSheetRef>(null);

  const {orders} = useAppSelector(useOrderSelector);
  const dispatch = useAppDispatch();
  const isFocus = useIsFocused();

  const order = orders.find(item => item.id === params.id);

  useEffect(() => {
    if (isFocus) {
      setShowBottomBar(false, 'OrderSummaryScreen');
    }
  }, [isFocus]);

  useEffect(() => {
    if (order) {
      const timeDiff = getDifferenceInDays(
        order.createdAt,
        new Date().getTime(),
      );
      if (timeDiff > 0.5) {
        dispatch(
          updateOrder({
            id: params.id,
            status: 'in-transit',
          }),
        );
      } else if (timeDiff > 1) {
        dispatch(
          updateOrder({
            id: params.id,
            status: 'out-for-delivery',
          }),
        );
      }
    }
  }, []);

  const updateRating = (rating: number) => {
    dispatch(
      updateOrder({
        id: params.id,
        rating,
      }),
    );
  };

  const billing = order?.payment?.billingDetails;

  return (
    <>
      <HeaderBar showBackButton title="Order Summary" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Card isShadow>
            <Text style={styles.sectionTitle}>Items Summary</Text>

            {order?.products.map(product => (
              <View style={styles.productItem}>
                <Image
                  style={styles.productimage}
                  source={{uri: product.thumbnail}}
                />
                <View style={styles.productContent}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.productSubTitle}>
                    ₹ {product.finalPrice} • x {product.quantity}
                  </Text>
                </View>
                <View>
                  <Text>₹ {product.finalPrice * product.quantity}</Text>
                </View>
              </View>
            ))}
          </Card>
          <SpacerH20 />
          <Card>
            <Text style={styles.sectionTitle}>Rate The Product</Text>
            <View style={styles.starsWrapper}>
              {[1, 2, 3, 4, 5].map(item => (
                <Pressable key={item} onPress={() => updateRating(item)}>
                  <Icon
                    name={item > (order?.rating || 0) ? 'star-outline' : 'star'}
                    size={30}
                    color={COLOR.yellow}
                  />
                </Pressable>
              ))}
            </View>
            <View style={styles.starsWrapper}>
              <Button
                title="Buy Again"
                onPress={() => {
                  order?.products.forEach(product => {
                    dispatch(addProductToCart(product));
                  });
                  navigateToScreen('CartScreen');
                }}
              />
              <Separator width={20} />
              <Button
                variant="secondary"
                title="help ?"
                onPress={() => {
                  sheetRef.current?.scrollTo(screenHeight * 0.4);
                }}
              />
            </View>
          </Card>
          <SpacerH20 />
          <Card>
            {billing ? (
              <BillingDetails billing={billing} />
            ) : (
              <InfoText
                justifyContent="space-between"
                title="Total Amount"
                value={`₹ ${order?.total}`}
                fontWeight="bold"
              />
            )}
          </Card>
          <SpacerH20 />
          <Card>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <InfoText title="Order ID" value={order?.id} />
            <InfoText title="Order Date" value={formatDate(order?.createdAt)} />
            <InfoText title="Order Status" value={toTitleCase(order?.status)} />
            <InfoText
              title="Payment"
              value={toTitleCase(order?.payment?.paymentMethod)}
            />
            <InfoText
              title="Deliver To"
              value={<RenderAddress address={order?.address} />}
            />
          </Card>
        </View>
      </ScrollView>
      <BottomSheet ref={sheetRef} showBackdrop maxTopPosition={screenHeight}>
        <HelpSheet />
      </BottomSheet>
    </>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productsWrapper: {},
  order: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLOR.lightGray,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  productimage: {
    width: 60,
    height: 60,
  },
  productContent: {
    flexShrink: 1,
    paddingHorizontal: 10,
    flex: 1,
  },
  productTitle: {
    fontSize: 12,
    color: COLOR.black,
  },
  productSubTitle: {
    color: COLOR.black,
    fontSize: 10,
    opacity: 0.8,
  },

  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
