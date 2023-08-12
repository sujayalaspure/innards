import {
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  PressableProps,
} from 'react-native';
import React, {ReactNode} from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';

interface Props extends PressableProps {
  title: string;
  onPress?: () => void;
  style?: any;
  variant?: 'primary' | 'secondary';
  children?: ReactNode;
  isLoading?: boolean;
}

const Button = ({
  title,
  onPress,
  style,
  variant = 'primary',
  children,
  isLoading = false,
  disabled,
  ...props
}: Props) => {
  const textColor = variant === 'primary' ? COLOR.white : COLOR.primary;
  const buttonColor = variant === 'primary' ? COLOR.primary : COLOR.white;
  const opacity = disabled ? 0.5 : 1;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: buttonColor,
          opacity,
        },
        style,
      ]}
      {...props}>
      {isLoading && <ActivityIndicator color={textColor} />}
      {!isLoading && title && (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
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
    borderWidth: 2,
    borderColor: COLOR.primary,
  },
  text: {
    fontSize: moderateScale(SIZE.font),
    color: COLOR.white,
    fontWeight: 'bold',
  },
});
