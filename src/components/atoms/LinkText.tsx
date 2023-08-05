import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';

type Props = {
  onPress: () => void;
  title: string;
  textStyle?: object;
};

const LinkText = ({title, onPress, textStyle}: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Text style={[styles.linkText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default LinkText;

const styles = StyleSheet.create({
  pressable: {
    marginBottom: -3,
    // backgroundColor: 'yellow',
  },
  linkText: {
    color: COLOR.primaryDark,
    alignSelf: 'center',
    // lineHeight: 5,
  },
});
