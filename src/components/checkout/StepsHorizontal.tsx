import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';
import {screenWidth} from '@app/utils/scaling_unit';
import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated';

export type Step = {
  id: string;
  title: string;
  icon: string;
};

type Props = {
  steps: Step[];
  activeStep: string;
  onPress?: (item: Step) => void;
};

const StepsHorizontal = ({steps, activeStep, onPress}: Props) => {
  const activeIndex = steps.findIndex(step => step.id === activeStep);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <StepMarker
          key={step.id}
          onPress={() => onPress?.(step)}
          {...step}
          isActive={step.id === activeStep}
          index={index}
          size={steps.length}
          activeIndex={activeIndex}
        />
      ))}
    </View>
  );
};

const StepMarker = ({id, title, index, size, onPress, activeIndex}: any) => {
  const lineWidth = (screenWidth - size * 26) / size;
  const isActive = useDerivedValue(() => withTiming(Number(activeIndex >= index)));

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(isActive.value, [0, 1], [COLOR.gray, COLOR.primary]),
    };
  });
  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(isActive.value, [0, 1], [COLOR.white, COLOR.primary]),
      borderColor: interpolateColor(isActive.value, [0, 1], [COLOR.gray, COLOR.primary]),
    };
  });

  return (
    <>
      {index !== 0 && (
        <Animated.View
          style={[
            styles.markerLine,
            {
              width: lineWidth,
            },
            animatedLineStyle,
          ]}
        />
      )}
      <Pressable style={styles.stepMarker} onPress={onPress}>
        <Animated.View style={[styles.markerDot, animatedDotStyle]}>
          <Text style={[styles.stepId, activeIndex >= index && styles.activeStepId]}>{id}</Text>
        </Animated.View>
        <Text style={styles.stepTitle}>{title}</Text>
      </Pressable>
    </>
  );
};

export default StepsHorizontal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 26,
  },
  stepMarker: {
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    backgroundColor: COLOR.white,
    borderWidth: 2,
    borderColor: COLOR.primary,
    height: 26,
    width: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepMarker: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
  },
  stepId: {
    color: COLOR.black,
  },
  activeStepId: {
    color: COLOR.white,
  },
  markerLine: {
    height: 2,
    backgroundColor: COLOR.primary,
  },
  stepTitle: {
    top: 26,
    // left: 0,
    textAlign: 'center',
    position: 'absolute',
    color: COLOR.black,
    flexWrap: 'nowrap',
    flexShrink: 0,
    width: 100,
  },
});
