import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Card from '@app/components/atoms/Card';
import LinkNIcon from '@app/components/atoms/LinkNIcon';
import COLOR from '@app/theme/COLOR';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Separator from '@app/components/atoms/Separator';
import {useAppSelector} from '@app/redux/reduxHook';
import {userSelector} from '@app/redux/reducers/userSlice';
import {Location, UserInerface} from '@app/types/user';

const AddressView = () => {
  const {user} = useAppSelector(userSelector);

  const {
    name: {first, last},
    location,
  } = user as UserInerface;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Address</Text>
        <Card chipText="DEFAULT">
          <View style={styles.addressWrapper}>
            <View style={styles.iconWrapper}>
              <Icon name="check-underline-circle" size={30} color={COLOR.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.name}>{`${first} ${last}`}</Text>
              <RenderAddress address={location} />
              <Separator height={10} />
              <View style={styles.row}>
                <LinkNIcon text="Edit" color={COLOR.black} />
                <LinkNIcon text="Remove" color={COLOR.accent} />
              </View>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>ARRIVING BY</Text>
        <Card>
          <View style={styles.arriverByCard}>
            <View style={styles.content}>
              <Text style={styles.name}>STANDARD DELIVERY</Text>
              <Text style={styles.address}>(Within 7 to 9 Business Days)</Text>
            </View>
            <View>
              <Text style={styles.address}>₹49</Text>
            </View>
          </View>
        </Card>
      </View>
      <Separator height={20} />
      <View style={styles.optionRow}>
        <Icon name="checkbox-marked" size={30} color={COLOR.primary} />
        <Text style={styles.address}>My Billing and Delivery Information are the same.</Text>
      </View>
      <View style={styles.optionRow}>
        <Icon name="checkbox-marked" size={30} color={COLOR.primary} />
        <Text style={styles.address}>I would like to gift pack this Item.</Text>
      </View>
    </View>
  );
};

export default AddressView;

export const RenderAddress = ({address}: {address?: Location}) => {
  return (
    <Text style={styles.address}>
      {` ${address?.street?.number} ${address?.street?.name}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.postcode}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: screenWidth,
    backgroundColor: COLOR.white,
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
  addressWrapper: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    marginBottom: moderateScale(18),
    color: COLOR.black,
  },
  address: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    marginBottom: moderateScale(4),
    color: COLOR.black,
    opacity: 0.8,
    flexWrap: 'wrap',
  },
  iconWrapper: {
    paddingRight: moderateScale(10),
  },
  content: {
    paddingHorizontal: moderateScale(10),
    flexShrink: 1,
  },

  arriverByCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: moderateScale(10),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
});
