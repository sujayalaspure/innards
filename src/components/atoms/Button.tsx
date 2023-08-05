import {Text, Pressable, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';

type Props = {
  title?: string;
  onPress: () => void;
  style?: any;
  variant?: 'primary' | 'secondary';
  children?: ReactNode;
};

const Button = ({
  title,
  onPress,
  style,
  variant = 'primary',
  children,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          ...(variant === 'primary'
            ? styles.primaryStyle
            : styles.secondaryStyle),
        },
        style,
      ]}>
      {title && (
        <Text
          style={[
            styles.text,
            {
              ...(variant === 'primary'
                ? styles.primaryTextStyle
                : styles.secondaryTextStyle),
            },
          ]}>
          {title?.toUpperCase()}
        </Text>
      )}
      {children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(SIZE.radius),
  },
  primaryStyle: {
    backgroundColor: COLOR.primary,
  },
  secondaryStyle: {
    borderWidth: 2,
    borderColor: COLOR.primary,
  },
  text: {
    fontSize: moderateScale(SIZE.font),
    color: COLOR.white,
    fontWeight: 'bold',
  },
  primaryTextStyle: {
    color: COLOR.white,
  },
  secondaryTextStyle: {
    color: COLOR.primary,
  },
});
