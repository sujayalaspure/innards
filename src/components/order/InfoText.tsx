import COLOR from '@app/theme/COLOR';
import React, {ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InfoText = ({
  title,
  value,
  justifyContent = 'flex-start',
  color = COLOR.black,
  fontWeight = 'normal',
}: {
  title: string;
  value: string | number | ReactNode;
  justifyContent?: 'space-between' | 'flex-start';
  color?: string;
  fontWeight?: 'normal' | 'bold';
}) => {
  return (
    <View style={[styles.infoTextWrapper, {justifyContent}]}>
      <Text style={[styles.infoTextTitle, {color, fontWeight}]}>{title}:</Text>
      {React.isValidElement(value) ? (
        <View style={styles.flex1}>{value}</View>
      ) : (
        <Text style={[styles.infoTextValue, {color, fontWeight}]}>{value}</Text>
      )}
    </View>
  );
};

export default InfoText;

const styles = StyleSheet.create({
  infoTextWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    flexShrink: 1,
    paddingVertical: 2,
  },
  infoTextTitle: {
    fontSize: 12,
    color: COLOR.black,
    opacity: 0.8,
    marginRight: 6,
  },
  infoTextValue: {
    fontSize: 14,
    color: COLOR.black,
    // fontWeight: '600',
  },
  flex1: {
    flex: 1,
  },

  starsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
