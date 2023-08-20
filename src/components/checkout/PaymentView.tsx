import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  LayoutAnimation,
  UIManager,
  LayoutAnimationConfig,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import Card from '@app/components/atoms/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';
import RenderPaymentForm from '@app/components/checkout/RenderPaymentForm';
import {Payment} from '@app/types/order';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const layoutConfig: LayoutAnimationConfig = {
  duration: 500,
  create: {type: 'linear', property: 'opacity'},
  update: {type: 'spring', springDamping: 0.7},
  delete: {type: 'linear', property: 'opacity'},
};

const paymentMethods = [
  {
    id: '1',
    title: 'Credit/Debit Card',
    icon: 'credit-card',
    type: 'card',
  },
  {
    id: '2',
    title: 'Net Banking',
    icon: 'bank',
    type: 'netbanking',
  },
  {
    id: '3',
    title: 'UPI',
    icon: 'google-wallet',
    type: 'upi',
  },
  {
    id: '4',
    title: 'Cash on Delivery',
    icon: 'cash',
    type: 'cod',
  },
] as const;

export type PaymentTypes = (typeof paymentMethods)[number]['type'];

type Props = {
  onUpdatePayment: (payment: Partial<Payment>) => void;
};

const PaymentView = ({onUpdatePayment}: Props) => {
  const [selectedMethod, setSelectedMethod] = useState('1');

  const onSelected = (id: string) => {
    const method = paymentMethods.find(item => item.id === id);
    if (method) {
      onUpdatePayment({paymentMethod: method.type});
    }
    setSelectedMethod(id);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Payment View</Text>
        {paymentMethods.map(method => (
          <PaymentMethod
            onSelect={onSelected}
            onChange={onUpdatePayment}
            key={method.id}
            {...method}
            isSelected={selectedMethod === method.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default PaymentView;

type PaymentMethodProps = {
  id: string;
  title: string;
  type: PaymentTypes;
  icon?: string;
  isSelected: boolean;
  onSelect?: (id: string) => void;
  onChange?: (payment: Partial<Payment>) => void;
};

const PaymentMethod = ({
  id,
  title,
  isSelected,
  onSelect,
  type,
}: PaymentMethodProps) => {
  const onSelected = () => {
    LayoutAnimation.configureNext(layoutConfig);
    onSelect?.(id);
  };
  return (
    <View style={styles.paymentCard}>
      <Card>
        <View style={styles.paymentMethodWrapper}>
          <Pressable onPress={onSelected}>
            <Icon
              name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
              size={30}
              color={COLOR.primary}
            />
          </Pressable>
          <Text style={styles.paymentMethodHeading}>{title}</Text>
        </View>
        {isSelected && (
          <View>
            <RenderPaymentForm type={type} />
          </View>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    // flex: 1,
    backgroundColor: COLOR.white,
    paddingBottom: moderateScale(20),
  },
  section: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  sectionHeading: {
    fontSize: moderateScale(22),
    fontWeight: '500',
    color: COLOR.black,
    marginBottom: moderateScale(10),
  },
  paymentCard: {
    marginVertical: moderateScale(6),
  },
  paymentMethodHeading: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLOR.black,
    marginLeft: moderateScale(10),
  },
  paymentMethodWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
