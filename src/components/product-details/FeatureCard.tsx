import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';
import {moderateScale} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SIZE from '@app/theme/SIZE';

type Props = {
  id?: string | number;
  heading?: string;
  subHeading?: string;
  icon?: string;
  color?: string;
  iconColor?: string;
};

const FeatureCard = ({
  heading,
  subHeading,
  icon = 'star',
  color = COLOR.primary,
  iconColor = COLOR.white,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.icon, {backgroundColor: color}]}>
        <Icon name={icon} size={moderateScale(25)} color={iconColor} />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
    </View>
  );
};

export default FeatureCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: moderateScale(5),
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: SIZE.radius,
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
    opacity: 0.8,
  },
  heading: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  subHeading: {
    fontSize: moderateScale(10),
    fontWeight: '300',
    color: COLOR.black,
    opacity: 0.8,
  },
});
