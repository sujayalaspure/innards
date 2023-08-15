import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';

type Props = {
  title: string;
  onPress?: (i?: number | string) => void;
  isSelected?: boolean;
  index?: number | string;
};

const Chip = ({title, onPress, isSelected, index}: Props) => {
  const backgroundColor = isSelected ? COLOR.primary : COLOR.white;
  const textColor = isSelected ? COLOR.white : COLOR.black;
  const onPressHandler = () => {
    if (onPress) {
      onPress(index);
    }
  };
  return (
    <Pressable
      style={[styles.container, {backgroundColor}]}
      onPress={onPressHandler}>
      <Text style={[styles.text, {color: textColor}]}>{title}</Text>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(6),
    borderWidth: 1,
    borderColor: COLOR.primary,
  },
  text: {},
});
