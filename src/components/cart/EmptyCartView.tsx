import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {emptyCartImage} from '@app/assets/images';
import {navigateToScreen} from '@app/navigation';
import COLOR from '@app/theme/COLOR';
import {moderateScale} from '@app/utils/scaling_unit';
import Button from '@app/components/atoms/Button';

const EmptyCartView = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.emptyCartImage]}>
        <Image source={emptyCartImage} resizeMode="cover" style={styles.image} />
        <Text style={styles.emptyCartTitle}>Looks like your cart is Empty</Text>
        <Text style={styles.emptyCartSubText}>Check our bestsellers and find something for you</Text>
        <Button
          variant="secondary"
          onPress={() => navigateToScreen('HomeScreen')}
          style={styles.button}
          title="Shop Now"
        />
      </View>
    </View>
  );
};

export default EmptyCartView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
    color: COLOR.black,
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
