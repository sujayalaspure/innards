import {View, Text} from 'react-native';
import React from 'react';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {StyleSheet} from 'react-native';

const CheckoutScreen = () => {
  return (
    <>
      <HeaderBar showBackButton title={'Checkout'} />
      <View style={styles.container}>
        <Text>CheckoutScreen</Text>
      </View>
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {},
});
