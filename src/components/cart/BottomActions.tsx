import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import Button from '@app/components/atoms/Button';
import COLOR from '@app/theme/COLOR';
import LinkNIcon from '@app/components/atoms/LinkNIcon';
import {useAppSelector} from '@app/redux/reduxHook';
import {isShowBottomBar} from '@app/redux/reducers/userSlice';

type Props = {
  price: number | string;
  onPlaceOrder: () => void;
  buttonText?: string;
  onDetailsPressed: () => void;
};

const BottomActions = ({
  price,
  onPlaceOrder,
  onDetailsPressed,
  buttonText = 'Place Order',
}: Props) => {
  const floatAmount = parseFloat(price.toString()).toFixed(2);
  const wholeAmount = floatAmount.split('.')[0];
  const decimalAmount = floatAmount.split('.')[1];
  const shouldShowBottomBar = useAppSelector(isShowBottomBar);
  const bottom = shouldShowBottomBar ? 60 : 0;

  return (
    <>
      <View style={[styles.container, {bottom}]}>
        <View style={styles.orderDetails}>
          <Text style={styles.price}>
            ₹ {wholeAmount}.<Text style={styles.decimal}>{decimalAmount}</Text>
          </Text>

          <LinkNIcon
            color={COLOR.blue}
            text="View Price Details"
            onPress={onDetailsPressed}
          />
        </View>
        <Button onPress={onPlaceOrder} title={buttonText} />
      </View>
    </>
  );
};

export default BottomActions;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    backgroundColor: COLOR.white,
    minHeight: moderateScale(80),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(10),
  },
  orderDetails: {
    flex: 1.5,
  },
  price: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: COLOR.black,
  },
  decimal: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    color: COLOR.black,
  },
  priceDetails: {
    color: COLOR.blue,
  },
});
