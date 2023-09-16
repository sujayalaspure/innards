import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useRef} from 'react';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Order} from '@app/types/order';
import {StyleSheet} from 'react-native';
import Card from '@app/components/atoms/Card';
import COLOR from '@app/theme/COLOR';
import Separator, {SpacerH20, SpacerH70} from '@app/components/atoms/Separator';
import {RenderAddress} from '@app/components/checkout/AddressView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@app/components/atoms/Button';
import {navigateToScreen} from '@app/navigation';
import {addProductToCart} from '@app/redux/reducers/productSlice';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {formatDate, getDifferenceInDays, toTitleCase} from '@app/utils/commonFunctions';
import {updateOrder, useOrderSelector} from '@app/redux/reducers/orderSlice';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import {screenHeight} from '@app/utils/scaling_unit';
import HelpSheet from '@app/components/order/HelpSheet';
import InfoText from '@app/components/order/InfoText';
import BillingDetails from '@app/components/order/BillingDetails';
import {translate} from '@app/i18n/translate';
import useBottomBar from '@app/hooks/useBottomBar';

type ParamList = {
  Params: Order;
};

const OrderSummaryScreen = () => {
  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const sheetRef = useRef<BottomSheetRef>(null);

  const {orders} = useAppSelector(useOrderSelector);
  const dispatch = useAppDispatch();

  const order = orders.find(item => item.id === params.id);

  useBottomBar(false, 'OrderSummaryScreen');

  useEffect(() => {
    if (order) {
      const timeDiff = getDifferenceInDays(order.createdAt, new Date().getTime());
      if (timeDiff > 0.5) {
        dispatch(updateOrder({id: params.id, status: 'in-transit'}));
      } else if (timeDiff > 1) {
        dispatch(updateOrder({id: params.id, status: 'out-for-delivery'}));
      }
    }
  }, []);

  const updateRating = (rating: number) => {
    dispatch(updateOrder({id: params.id, rating}));
  };

  const billing = order?.payment?.billingDetails;

  return (
    <>
      <HeaderBar showBackButton title={translate('order_summary')} />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card isShadow>
            <Text style={styles.sectionTitle}>{translate('items_summary')}</Text>

            {order?.products.map(product => (
              <View style={styles.productItem} key={product.id}>
                <Image style={styles.productimage} source={{uri: product.thumbnail}} />
                <View style={styles.productContent}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.productSubTitle}>
                    ₹ {product.finalPrice} • x {product.quantity}
                  </Text>
                </View>
                <View>
                  <Text style={styles.productSubTitle}>₹ {product.finalPrice * product.quantity}</Text>
                </View>
              </View>
            ))}
          </Card>
          <SpacerH20 />
          <Card>
            <Text style={styles.sectionTitle}>{translate('rate_product')}</Text>
            <View style={styles.starsWrapper}>
              {[1, 2, 3, 4, 5].map(item => (
                <Pressable key={item} onPress={() => updateRating(item)}>
                  <Icon name={item > (order?.rating || 0) ? 'star-outline' : 'star'} size={30} color={COLOR.yellow} />
                </Pressable>
              ))}
            </View>
            <View style={styles.starsWrapper}>
              <Button
                title={translate('buy_again')}
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
                title={translate('help')}
                onPress={() => {
                  sheetRef.current?.open();
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
                title={translate('total_amount')}
                value={`₹ ${order?.total}`}
                fontWeight="bold"
              />
            )}
          </Card>
          <SpacerH20 />
          <Card>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <InfoText title={translate('order_id')} value={order?.id} />
            <InfoText title={translate('order_date')} value={formatDate(order?.createdAt)} />
            <InfoText title={translate('order_status')} value={toTitleCase(order?.status)} />
            <InfoText title={translate('payment')} value={toTitleCase(order?.payment?.paymentMethod)} />
            <InfoText title={translate('deliver_to')} value={<RenderAddress address={order?.address} />} />
          </Card>
          <SpacerH70 />
        </ScrollView>
      </View>
      <BottomSheet
        ref={sheetRef}
        showBackdrop
        sheetHeight={screenHeight * 0.4}
        snapPoints={{
          top: screenHeight * 0.4,
        }}>
        <HelpSheet />
      </BottomSheet>
    </>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollView: {padding: 20},
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
    height: '100%',
  },
  productTitle: {
    fontSize: 12,
    color: COLOR.black,
    fontWeight: '600',
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
