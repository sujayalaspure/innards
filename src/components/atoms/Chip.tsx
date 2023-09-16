import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';

type Props = {
  title: string;
  onPress?: (i?: number | string) => void;
  isSelected?: boolean;
  index?: number | string;
  style?: any;
  textStyle?: any;
};

const Chip = ({title, onPress, isSelected, index, style, textStyle}: Props) => {
  const backgroundColor = isSelected ? COLOR.primary : COLOR.white;
  const textColor = isSelected ? COLOR.white : COLOR.black;
  const onPressHandler = () => {
    if (onPress) {
      onPress(index);
    }
  };
  return (
    <Pressable style={[styles.container, {backgroundColor}, style]} onPress={onPressHandler}>
      <Text style={[styles.text, {color: textColor}, textStyle]}>{title}</Text>
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
  text: {
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
});
