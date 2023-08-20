import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CreditCardFormView from '@app/components/checkout/CreditCardFormView';
import UPIView from '@app/components/checkout/UPIView';
import {PaymentTypes} from '@app/components/checkout/PaymentView';
import COLOR from '@app/theme/COLOR';
import Separator from '@app/components/atoms/Separator';

type Props = {
  type: PaymentTypes;
  onChange?: (type: PaymentTypes, value: string) => void;
};

const RenderPaymentForm = ({type}: Props) => {
  switch (type) {
    case 'card':
      return <CreditCardFormView />;
    case 'netbanking':
      return (
        <View>
          <Separator height={10} />
          <Text style={styles.captionText}>
            Coming soon! We are working on it.
          </Text>
        </View>
      );
    case 'upi':
      return <UPIView />;
    case 'cod':
      return (
        <View>
          <Separator height={10} />
          <Text style={styles.captionText}>
            Digital payment options via UPI, Wallets or Credit/Debit Cards are
            also available at the time of delivery.
          </Text>
        </View>
      );
    default:
      break;
  }
  return (
    <View>
      <Text>{type}</Text>
    </View>
  );
};

export default RenderPaymentForm;

const styles = StyleSheet.create({
  container: {},
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLOR.gray,
  },
});
