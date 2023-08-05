import COLOR from '@app/theme/COLOR';
import React, {useEffect} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Circle, G, Svg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onPress: () => void;
  percentage?: number;
  showProgress?: boolean;
};

const size = 80;
const strokeWidth = 7;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;
const iconSize = 52;
const CircularButton = ({percentage = 0, onPress, showProgress}: Props) => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const theta = useSharedValue(0);

  useEffect(() => {
    theta.value = circumference - (circumference * percentage) / 100;
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(theta.value, {
        duration: 1500,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
            {showProgress && (
              <AnimatedCircle
                animatedProps={animatedProps}
                stroke={COLOR.primary}
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeLinecap="round"
              />
            )}
            <Circle fill={COLOR.white} cx={center} cy={center} r={radius} />
          </G>
        </Svg>
        <Icon
          style={styles.icon}
          name="chevron-right"
          size={52}
          color={COLOR.primary}
        />
      </Pressable>
    </View>
  );
};

export default CircularButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size / 2,
    overflow: 'hidden',
    height: size,
    width: size,
    position: 'relative',
  },
  icon: {
    padding: 0,
    position: 'absolute',
    top: (size - iconSize) / 2,
    left: (size - iconSize) / 2,
  },
});
