import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {BlurView} from '@react-native-community/blur';
import Button from '@app/components/atoms/Button';
import Separator from '@app/components/atoms/Separator';
import SIZE from '@app/theme/SIZE';
import COLOR from '@app/theme/COLOR';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring} from 'react-native-reanimated';

type Props = {
  onPrimaryPress?: () => void;
  primaryText: string;
  onSecondaryPress?: () => void;
  secondaryText: string;
  testID?: {
    primaryButton?: string;
    secondaryButton?: string;
  };
};

const BottomActions = ({onPrimaryPress, onSecondaryPress, primaryText, secondaryText, testID}: Props) => {
  const theta = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: withDelay(500, withSpring(theta.value))}],
  }));

  useEffect(() => {
    theta.value = 0;
  }, []);

  return (
    <Animated.View style={[styles.bottomAction, animatedStyle]}>
      <BlurView
        style={styles.absolute}
        blurType={COLOR.light === 'light' ? 'light' : 'dark'}
        blurAmount={30}
        reducedTransparencyFallbackColor={COLOR.white}
      />
      {onSecondaryPress && secondaryText && (
        <>
          <Button
            testID={`button_${testID?.secondaryButton}`}
            onPress={onSecondaryPress}
            variant="secondary"
            title={secondaryText}
          />
          <Separator width={20} />
        </>
      )}
      <Button testID={`button_${testID?.primaryButton}`} onPress={onPrimaryPress} title={primaryText} />
    </Animated.View>
  );
};

export default BottomActions;

const styles = StyleSheet.create({
  bottomAction: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 34,
    margin: 26,
    borderRadius: SIZE.radius_md,
    borderWidth: 1,
    borderColor: COLOR.primary,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
