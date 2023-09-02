import {Text, Pressable, StyleSheet, ActivityIndicator, PressableProps, View} from 'react-native';
import React, {ReactNode} from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SpacerW6} from '@app/components/atoms/Separator';

interface Props extends PressableProps {
  title?: string;
  onPress?: () => void;
  style?: any;
  variant?: 'primary' | 'secondary';
  children?: ReactNode;
  isLoading?: boolean;
  iconName?: string;
  testID?: string;
}

const Button = ({
  title,
  onPress,
  style,
  variant = 'primary',
  children,
  isLoading = false,
  disabled,
  iconName,
  testID,
  ...props
}: Props) => {
  const textColor = variant === 'primary' ? COLOR.white : COLOR.primary;
  const buttonColor = variant === 'primary' ? COLOR.primary : COLOR.white;
  const opacity = disabled ? 0.5 : 1;
  return (
    <Pressable
      testID={`pressable_${testID}`}
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
      <View style={styles.content}>
        {!isLoading && iconName && (
          <>
            <Icon name={iconName} size={30} color={textColor} />
            <SpacerW6 />
          </>
        )}
        {!isLoading && title && (
          <Text
            testID={`text_${testID}`}
            style={[
              styles.text,
              {
                color: textColor,
              },
            ]}>
            {title?.toUpperCase()}
          </Text>
        )}
      </View>
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
    fontSize: moderateScale(16),
    color: COLOR.white,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
