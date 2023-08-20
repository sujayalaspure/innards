import {FlatList, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {StyleSheet} from 'react-native';
import BottomActions from '@app/components/cart/BottomActions';
import {RouteProp, useRoute} from '@react-navigation/native';
import {setShowBottomBar} from '@app/navigation';
import StepsHorizontal from '@app/components/checkout/StepsHorizontal';
import AddressView from '@app/components/checkout/AddressView';
import Separator from '@app/components/atoms/Separator';
import PaymentView from '@app/components/checkout/PaymentView';
import OrderSuccessView from '@app/components/checkout/OrderSuccessView';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {
  addOrUpdateCurrentOrder,
  addOrder,
  useOrderSelector,
} from '@app/redux/reducers/orderSlice';
import {userSelector} from '@app/redux/reducers/userSlice';
import {BillDetails, PaymentMethod} from '@app/types/order';
import {emptyCart} from '@app/redux/reducers/productSlice';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import BillingDetails from '@app/components/order/BillingDetails';
import {screenHeight} from '@app/utils/scaling_unit';

type ParamList = {
  Params: {
    totalPrice: string;
    billing: BillDetails;
  };
};

const CheckoutScreen = () => {
  const sheetRef = useRef<BottomSheetRef>(null);

  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const [currentActiveStep, setCurrentActiveStep] = useState('1');
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const slideRef = useRef<FlatList>(null);
  const dispatch = useAppDispatch();
  const {currentOrder} = useAppSelector(useOrderSelector);
  const {user} = useAppSelector(userSelector);

  useEffect(() => {
    setShowBottomBar(false, 'CheckoutScreen');
  }, []);

  const stepsView = [
    {
      id: '1',
      title: 'Address',
      icon: 'map-marker',
      component: <AddressView />,
    },
    {
      id: '2',
      title: 'Payment',
      icon: 'credit-card',
      component: (
        <PaymentView
          onUpdatePayment={value => setPayment(value.paymentMethod)}
        />
      ),
    },
    {
      id: '3',
      title: 'Order',
      icon: 'check-circle',
      component: <OrderSuccessView />,
    },
  ];

  const onSuccessOrder = () => {
    console.log('onSuccessOrder', currentOrder);
    dispatch(
      addOrder({
        ...currentOrder,
        status: 'pending',
        payment: {
          ...currentOrder?.payment,
          status: 'paid',
        },
      }),
    );
    dispatch(emptyCart());
  };

  const onProceed = () => {
    console.log('onProceed', currentActiveStep);
    switch (currentActiveStep) {
      case '1':
        dispatch(
          addOrUpdateCurrentOrder({
            address: user?.location,
          }),
        );
        break;
      case '2':
        dispatch(
          addOrUpdateCurrentOrder({
            payment: {
              createdAt: new Date().getTime().toString(),
              status: 'pending',
              amount: parseInt(params?.totalPrice || '0', 10),
              paymentMethod: payment,
              billingDetails: params.billing,
            },
          }),
        );
        break;
      case '3':
        onSuccessOrder();
        break;
      default:
        break;
    }
    setCurrentActiveStep(prev =>
      Math.min(stepsView.length, Number(prev) + 1).toString(),
    );
  };

  useEffect(() => {
    console.log('currentActiveStep', currentOrder);
    slideRef.current?.scrollToIndex({index: Number(currentActiveStep) - 1});
    if (currentActiveStep === '3') {
      onSuccessOrder();
    }
  }, [currentActiveStep]);

  const billing = params?.billing;
  const totalPrice = billing?.total + billing?.tax + billing?.shipping || 0;

  return (
    <>
      <HeaderBar showBackButton title={'Checkout'} />
      <View style={styles.container}>
        <StepsHorizontal
          steps={stepsView}
          activeStep={currentActiveStep}
          onPress={item => {
            if (item.id < currentActiveStep) {
              setCurrentActiveStep(item.id);
            }
          }}
        />
        <Separator height={20} />
        <FlatList
          scrollEnabled={false}
          ref={slideRef}
          data={stepsView}
          renderItem={({item}) => <View>{item.component}</View>}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          bounces={false}
        />

        <Separator height={20} />
      </View>
      <BottomSheet showBackdrop ref={sheetRef}>
        <View style={styles.billingDetails}>
          <BillingDetails billing={billing} />
        </View>
      </BottomSheet>
      {currentActiveStep !== '3' && (
        <BottomActions
          buttonText={currentActiveStep === '2' ? 'Pay' : 'Proceed'}
          price={totalPrice || 0}
          onPlaceOrder={onProceed}
          onDetailsPressed={() => {
            sheetRef.current?.scrollTo(screenHeight / 3);
          }}
        />
      )}
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLOR.white,
    // flex: 1,
  },
  billingDetails: {
    paddingHorizontal: 20,
  },
});
