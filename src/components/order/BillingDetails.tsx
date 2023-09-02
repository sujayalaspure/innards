import React from 'react';
import InfoText from '@app/components/order/InfoText';
import {BillDetails} from '@app/types/order';
import COLOR from '@app/theme/COLOR';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {formatNumber} from '@app/utils/commonFunctions';

type Props = {
  billing: BillDetails;
};

const BillingDetails = ({billing}: Props) => {
  const totalPrice = formatNumber(
    // @ts-ignore
    billing?.total + billing?.tax + billing?.shipping || 0,
  );
  return (
    <>
      <View style={styles.billingDetails}>
        <Text style={styles.sectionTitle}>Bill Details</Text>
        <InfoText
          justifyContent="space-between"
          title="MRP"
          value={`₹ ${billing?.mrp}`}
        />
        <InfoText
          justifyContent="space-between"
          title="Discount"
          value={`₹ -${billing?.discount}`}
          color={COLOR.primaryDark}
        />
        <InfoText
          justifyContent="space-between"
          title="Tax"
          value={`₹ ${billing?.tax}`}
        />
        <InfoText
          justifyContent="space-between"
          title="Shipping"
          value={`₹ ${billing?.shipping}`}
        />
        <InfoText
          justifyContent="space-between"
          title="Total Amount"
          value={`₹ ${totalPrice}`}
          fontWeight="bold"
        />
      </View>
    </>
  );
};

export default BillingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginBottom: 10,
  },
  billingDetails: {
    paddingHorizontal: 0,
  },
});
