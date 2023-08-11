import {View, StyleSheet} from 'react-native';
import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {screenHeight} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';

// const maxTopPosition = -screenHeight * 0.8;

type BottomSheetProps = {
  onTopReached?: (value: boolean) => void;
  children: any;
  showBackdrop?: boolean;
  maxBottomPosition?: number;
  maxTopPosition?: number;
};
export type BottomSheetRef = {
  scrollTo: (y: number) => void;
  isActive: () => boolean;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      onTopReached,
      showBackdrop = false,
      maxBottomPosition = 0,
      maxTopPosition = -screenHeight + 50,
    },
    ref,
  ) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const isSheetVisible = useSharedValue(false);

    const scrollTo = useCallback((y: number) => {
      'worklet';

      isSheetVisible.value = y !== 0;
      translateY.value = withSpring(y, {damping: 15});
    }, []);

    const isActive = useCallback(() => isSheetVisible.value, []);
    const isAtTop = useCallback(() => translateY.value === maxTopPosition, []);

    useImperativeHandle(ref, () => ({scrollTo, isActive, isAtTop}), [
      scrollTo,
      isActive,
      isAtTop,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        console.log('start');
        context.value = {y: translateY.value};
      })
      .onUpdate(({translationY}: any) => {
        translateY.value = (translationY as number) + context.value.y;
        translateY.value = Math.max(maxTopPosition, translateY.value);
        if (onTopReached) {
          runOnJS(onTopReached)(translateY.value === maxTopPosition);
        }
      })
      .onEnd(() => {
        if (translateY.value > maxBottomPosition) {
          scrollTo(maxBottomPosition);
        } else if (translateY.value < maxTopPosition * 0.9) {
          scrollTo(maxTopPosition);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [maxTopPosition + 50, maxTopPosition],
        [25, 5],
        Extrapolate.CLAMP,
      );
      const height = interpolate(
        translateY.value,
        [0, maxTopPosition],
        [0, -maxTopPosition],
        Extrapolate.CLAMP,
      );
      return {
        transform: [{translateY: translateY.value}],
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        height,
      };
    });

    const rBackDropStyle = useAnimatedStyle(() => ({
      opacity: isSheetVisible.value ? 1 : 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
    }));
    const rBackdropProps = useAnimatedProps(
      () => ({pointerEvents: isSheetVisible.value ? 'auto' : 'none'} as any),
    );

    return (
      <>
        {showBackdrop && (
          <Animated.View
            onTouchStart={() => {
              scrollTo(0);
            }}
            animatedProps={rBackdropProps}
            style={[StyleSheet.absoluteFillObject, rBackDropStyle]}
          />
        )}
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.container, rBottomSheetStyle]}>
            <View style={styles.topBar}>
              <View style={styles.line} />
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: '100%',
    backgroundColor: COLOR.white,
    position: 'absolute',
    top: screenHeight,
    overflow: 'hidden',
  },
  line: {
    height: 5,
    width: 50,
    backgroundColor: COLOR.lightGray,
    borderRadius: 5,
  },
  topBar: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
