import {View, StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import Section from '@app/components/Section';
import ProductCardVerticle from '@app/components/ProductCardVerticle';
import {launchSpace} from '@app/assets/images';
import Button from '@app/components/atoms/Button';
import {navigateToScreen} from '@app/navigation';
import Animated, {FadeIn} from 'react-native-reanimated';
import {clearCurrentOrder} from '@app/redux/reducers/orderSlice';

const OrderSuccessView = () => {
  const {products} = useAppSelector(useProductSelector);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.successWrapper}>
          <Animated.Text style={styles.successText} entering={FadeIn}>
            Your Order Placed Successfully!
          </Animated.Text>
          <Image style={styles.image} source={launchSpace} />
          <Button
            onPress={() => {
              dispatch(clearCurrentOrder());
              navigateToScreen('HomeScreen');
            }}
            style={styles.button}
            title="Continue Shopping"
          />
        </View>
        <View style={styles.myOrders}>
          <Section
            id={'my-orders'}
            title="My Orders"
            actionText="See All"
            onActionPress={() => navigateToScreen('OrdersScreen')}>
            {products?.slice(5, 14)?.map((item, i) => (
              <ProductCardVerticle key={i} product={item} />
            ))}
          </Section>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderSuccessView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: screenWidth,
    backgroundColor: COLOR.white,
  },
  successWrapper: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth,
  },
  successText: {
    fontSize: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    textAlign: 'center',
    color: COLOR.primaryDark,
    fontWeight: 'bold',
  },
  image: {
    height: screenWidth * 0.6,
    aspectRatio: 1,
  },
  button: {
    flex: 0,
    width: '80%',
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(50),
  },
  myOrders: {
    paddingHorizontal: moderateScale(20),
  },
});
