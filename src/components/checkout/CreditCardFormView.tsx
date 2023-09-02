import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import COLOR from '@app/theme/COLOR';
import Separator from '@app/components/atoms/Separator';

const CreditCardFormView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.captionText}>
        You may be directed to your bank’s 3D secure process to authenticate your information.
      </Text>
      <Separator height={10} />
      <TextInput
        placeholderTextColor={COLOR.gray + '99'}
        placeholder="Card Number *"
        style={styles.input}
        keyboardType="number-pad"
      />
      <Separator height={10} />
      <TextInput placeholder="Name on Card *" style={styles.input} />
      <Separator height={10} />
      <View style={styles.row}>
        <TextInput placeholder="YY/MM *" style={styles.input} maxLength={4} keyboardType="number-pad" />
        <Separator width={20} />
        <TextInput placeholder="CVV *" style={styles.input} maxLength={3} keyboardType="number-pad" />
      </View>
      <Text style={styles.captionText}>Card expiry date</Text>
    </View>
  );
};

export default CreditCardFormView;

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  input: {
    borderRadius: 6,
    borderWidth: 0.8,
    borderColor: COLOR.gray,
    fontSize: 16,
    fontWeight: '500',
    color: COLOR.black,
    padding: 10,
    marginBottom: 4,
    flex: 1,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLOR.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
