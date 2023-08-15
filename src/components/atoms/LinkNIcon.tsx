import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';

type Props = {
  text?: string;
  iconName: string;
  onPress: () => void;
  color?: string;
};

const LinkNIcon = ({text, iconName, onPress, color = COLOR.black}: Props) => {
  return (
    <Pressable
      style={[styles.container, !text && styles.iconWrapper]}
      onPress={onPress}>
      <Icon name={iconName} size={20} color={color} />
      {text && <Text style={{color}}>{text}</Text>}
    </Pressable>
  );
};

export default LinkNIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  iconWrapper: {
    backgroundColor: COLOR.accent + '20',
    padding: 6,
    borderRadius: 6,
  },
});
