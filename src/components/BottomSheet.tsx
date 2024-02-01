import {View, StyleSheet, LayoutChangeEvent} from 'react-native';
import React, {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {screenHeight} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import {BlurView} from '@react-native-community/blur';

type BottomSheetProps = {
  onTopReached?: (value: boolean) => void;
  children: React.ReactNode;
  showBackdrop?: boolean;
  maxBottomPosition?: number;
  maxTopPosition?: number;
  canClose?: boolean;
  sheetHeight?: number;
  snapPoints?: {top?: number; bottom?: number};
  onClosed?: () => void;
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
      sheetHeight = 0,
      snapPoints = {top: screenHeight + 50, bottom: 1},
      onClosed,
    },
    ref,
  ) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const isSheetVisible = useSharedValue(false);
    const [isOpen, setIsOpen] = useState(false);

    maxTopPosition = -1 * (snapPoints?.top || screenHeight + 50);
    maxBottomPosition = -1 * (snapPoints.bottom || 1);
    sheetHeight = sheetHeight * -1;

    const scrollTo = useCallback((y: number) => {
      'worklet';
      y = y < 0 ? y : y * -1;
      isSheetVisible.value = y !== 0;
      translateY.value = withSpring(y, {damping: 15});
      runOnJS(setIsOpen)(y !== 0);
    }, []);

    const isActive = useCallback(() => isSheetVisible.value, []);
    const isAtTop = useCallback(() => translateY.value === maxTopPosition, []);

    const open = useCallback(() => {
      setIsOpen(true);
      scrollTo(sheetHeight || screenHeight / 2);
    }, []);

    const close = useCallback(() => {
      scrollTo(0);
      setIsOpen(false);
      if (onClosed) {
        onClosed();
      }
    }, []);

    useImperativeHandle(ref, () => ({scrollTo, isActive, isAtTop, open, close}), [
      scrollTo,
      isActive,
      isAtTop,
      open,
      close,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(({translationY}: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
        const Yvalue = translationY + context.value.y;
        if (
          Math.abs(Yvalue) > (snapPoints.bottom || maxBottomPosition) &&
          Math.abs(Yvalue) <= (snapPoints.top || maxTopPosition)
        ) {
          translateY.value = translationY + context.value.y;
          translateY.value = Math.max(maxTopPosition, translateY.value);
        }
        if (onTopReached) {
          runOnJS(onTopReached)(translateY.value === maxTopPosition);
        }
      })
      .onEnd(() => {
        if (Math.abs(translateY.value) > Math.abs(maxTopPosition * 0.8)) {
          scrollTo(-maxTopPosition);
        } else if (canClose) {
          if (Math.abs(translateY.value) < screenHeight * 0.2) {
            close();
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
      const height = interpolate(translateY.value, [0, maxTopPosition], [0, -maxTopPosition], Extrapolate.CLAMP);
      return {
        transform: [{translateY: translateY.value}],
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        height,
      };
    });

    const rBackDropStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isSheetVisible.value ? 1 : 0, {duration: 200}),
      backgroundColor: 'rgba(0,0,0,0.5)',
    }));
    const rBackdropProps = useAnimatedProps(() => ({pointerEvents: isSheetVisible.value ? 'auto' : 'none'} as any));

    const onLayout = (e: LayoutChangeEvent) => {
      if (isOpen && sheetHeight === 0) {
        scrollTo(e.nativeEvent.layout.height + 40 + 34 * 2);
      }
    };

    return (
      <>
        {showBackdrop && (
          <Animated.View
            onTouchStart={close}
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
            <View onLayout={onLayout}>{children}</View>
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
