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
import {BlurView} from '@react-native-community/blur';

// const maxTopPosition = -screenHeight * 0.8;

type BottomSheetProps = {
  onTopReached?: (value: boolean) => void;
  children: React.ReactNode;
  showBackdrop?: boolean;
  maxBottomPosition?: number;
  maxTopPosition?: number;
  canClose?: boolean;
};
export type BottomSheetRef = {
  scrollTo: (y: number) => void;
  isActive: () => boolean;
  open: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      onTopReached,
      showBackdrop = false,
      maxBottomPosition = 1,
      maxTopPosition = screenHeight + 50,
      canClose = true,
    },
    ref,
  ) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const isSheetVisible = useSharedValue(false);

    maxTopPosition = maxTopPosition * -1;
    maxBottomPosition = maxBottomPosition * -1;

    /**
     * @param y - y position to scroll to from bottom (positive value)
     */
    const scrollTo = useCallback((y: number) => {
      'worklet';
      y = y < 0 ? y : y * -1;
      isSheetVisible.value = y !== 0;
      translateY.value = withSpring(y, {damping: 15});
    }, []);

    const isActive = useCallback(() => isSheetVisible.value, []);
    const isAtTop = useCallback(() => translateY.value === maxTopPosition, []);

    const open = useCallback(() => {
      scrollTo(screenHeight / 2);
    }, []);
    const close = useCallback(() => {}, []);

    useImperativeHandle(
      ref,
      () => ({scrollTo, isActive, isAtTop, open, close}),
      [scrollTo, isActive, isAtTop, open, close],
    );

    const gesture = Gesture.Pan()
      .onStart(() => {
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
        if (Math.abs(translateY.value) > Math.abs(maxTopPosition * 0.8)) {
          scrollTo(-maxTopPosition);
        } else if (canClose) {
          if (Math.abs(translateY.value) < screenHeight * 0.2) {
            scrollTo(0);
          }
        } else {
          if (Math.abs(translateY.value) < Math.abs(maxBottomPosition)) {
            scrollTo(-maxBottomPosition);
          }
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
      // backgroundColor: 'rgba(0,0,0,0.5)',
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
            style={[StyleSheet.absoluteFillObject, rBackDropStyle]}>
            <BlurView
              style={styles.absolute}
              blurType="dark"
              blurAmount={5}
              reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
            />
          </Animated.View>
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
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
