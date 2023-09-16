import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import Animated, {FadeIn, useAnimatedStyle, useSharedValue, withDelay, withSpring} from 'react-native-reanimated';
import COLOR from '@app/theme/COLOR';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import Section from '@app/components/Section';
import ProductCardVerticle from '@app/components/ProductCardVerticle';
import {launchSpace} from '@app/assets/images';
import Button from '@app/components/atoms/Button';
import {navigateToScreen} from '@app/navigation';
import {clearCurrentOrder} from '@app/redux/reducers/orderSlice';

type Props = {
  isFocused: boolean;
};

const OrderSuccessView = ({isFocused}: Props) => {
  const {products} = useAppSelector(useProductSelector);
  const dispatch = useAppDispatch();
  const theta = useSharedValue(0.1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: withDelay(200, withSpring(theta.value))}],
  }));

  useEffect(() => {
    if (isFocused) {
      theta.value = 1;
    } else {
      theta.value = 0.1;
    }
  }, [isFocused]);

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.successWrapper, animatedStyle]}>
          <Animated.Text style={styles.successText} entering={FadeIn}>
            Your Order Placed Successfully!
          </Animated.Text>
          <Animated.View style={animatedStyle}>
            <Image style={styles.image} source={launchSpace} />
          </Animated.View>
          <Button
            testID="continue_shopping"
            onPress={() => {
              dispatch(clearCurrentOrder());
              navigateToScreen('HomeScreen');
            }}
            style={styles.button}
            title="Continue Shopping"
          />
        </Animated.View>
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
