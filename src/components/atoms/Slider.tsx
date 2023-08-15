import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import COLOR from '@app/theme/COLOR';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Text} from 'react-native';

type Props = {
  onRangeChnage: (min: number, max: number) => void;
  min: number;
  max: number;
  unit?: string;
};

const Slider = ({onRangeChnage, min = 0, max = 100, unit}: Props) => {
  const [currentRange, setCurrentRange] = useState({
    min: 10,
    max: 90,
  });

  const lineWidth = useSharedValue('0%');
  const leftPos = useSharedValue('0%');

  useEffect(() => {
    lineWidth.value = Math.round(currentRange.max - currentRange.min) + '%';
    leftPos.value = currentRange.min + '%';
  }, [currentRange.min, currentRange.max]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(lineWidth.value, {
        duration: 200,
      }),
      left: withTiming(leftPos.value, {
        duration: 200,
      }),
    };
  });

  const leftDot = useAnimatedStyle(() => {
    return {
      left: withTiming(`${currentRange.min}%`, {
        duration: 200,
      }),
    };
  });
  const rightDot = useAnimatedStyle(() => {
    return {
      left: withTiming(`${currentRange.max}%`, {
        duration: 200,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.lineWrapper}>
        <Animated.View style={[styles.sliderDot, leftDot]} />
        <View style={[styles.sliderLine, styles.sliderLineBackground]} />

        <Animated.View
          style={[
            styles.sliderLine,
            styles.sliderLineForeground,
            animatedStyle,
          ]}
        />
        <Animated.View style={[styles.sliderDot, rightDot]} />
        {currentRange.min - currentRange.max > 0 && (
          <Text style={styles.errorMsg}>Error</Text>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textinput}
          value={currentRange.min.toString()}
          enablesReturnKeyAutomatically
          keyboardType="number-pad"
          onChangeText={text => {
            setCurrentRange({
              ...currentRange,
              min: Math.max(min, parseInt(text || '0', 10)),
            });
          }}
        />
        <TextInput
          defaultValue="0"
          style={styles.textinput}
          value={currentRange.max.toString()}
          keyboardType="number-pad"
          onChangeText={text => {
            setCurrentRange({
              ...currentRange,
              max: Math.min(max, parseInt(text || '0', 10)),
            });
          }}
        />
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineWrapper: {
    flex: 1,
    paddingBottom: 5,
  },
  sliderDot: {
    position: 'absolute',
    top: -5,
    bottom: 0,
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.primary,
    backgroundColor: COLOR.white,
    zIndex: 10,
  },

  sliderLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flex: 1,
    height: 4,
    width: '100%',
    borderRadius: 10,
  },
  sliderLineForeground: {
    backgroundColor: COLOR.primary,
    left: '20%',
  },
  sliderLineBackground: {
    backgroundColor: COLOR.gray,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textinput: {
    backgroundColor: COLOR.white,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLOR.gray,
    fontSize: 16,
  },
  errorMsg: {
    color: COLOR.accent,
  },
});
