import {View, StyleSheet, TextInput, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import {moderateScale} from '@app/utils/scaling_unit';

type Props = {
  count: number;
  onChange?: (count: number) => void;
  maxCount?: number;
  minCount?: number;
};

const CountButton = ({count, onChange, minCount = 0, maxCount = 99}: Props) => {
  const handleChange = (productCount: number) => {
    if (onChange && productCount >= minCount && productCount <= maxCount) {
      onChange(productCount);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleChange(Math.max(minCount, count - 1))}>
        <Icon style={styles.icon} name="minus" size={20} color={COLOR.white} />
      </Pressable>
      <TextInput
        style={styles.input}
        value={count.toString()}
        onChangeText={text => {
          if (!isNaN(Number(text))) {
            handleChange(Number(text));
          }
        }}
        keyboardType="numeric"
        maxLength={maxCount.toString().length}
      />
      <Pressable onPress={() => handleChange(Math.min(maxCount, count + 1))}>
        <Icon style={styles.icon} name="plus" size={20} color={COLOR.white} />
      </Pressable>
    </View>
  );
};

export default CountButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.black,
    borderRadius: moderateScale(4),
    paddingVertical: moderateScale(2),
  },
  input: {
    color: COLOR.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: moderateScale(18),
  },
  icon: {
    padding: moderateScale(2),
  },
});
