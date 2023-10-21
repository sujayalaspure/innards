import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SIZE from '@app/theme/SIZE';
import COLOR from '@app/theme/COLOR';
import {globalStyles} from '@app/components/GlobalStyles';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type ToastProps = {
  config?: Partial<ToastConfig>;
};

type ToastRefProps = {
  show: (msg: string, config?: Partial<ToastConfig>) => void;
};

type ToastConfig = {
  subHeading: string;
  timeout: number;
  bottomOffset: number;
  type: ToastType;
  autoHide: boolean;
  position: 'top' | 'bottom';
};

const defaultConfig: ToastConfig = {
  subHeading: '',
  timeout: 4000,
  bottomOffset: 60,
  type: 'info',
  autoHide: true,
  position: 'top',
};

type ToastType = 'success' | 'error' | 'info';

export const toastRef = React.createRef<ToastRefProps>();

export const showToast = (msg: string, config?: Partial<ToastConfig>) => {
  toastRef.current?.show(msg, config);
};

let timeout: NodeJS.Timeout;

const Toast = forwardRef<ToastRefProps, ToastProps>(({config}, ref) => {
  const [message, setMessage] = useState({
    text1: '',
    text2: '',
  });
  const [toastType, setToastType] = useState<ToastType>('info');
  let toastConfig = {...defaultConfig, ...config};
  const hiddenPositionMultiplier = toastConfig.position === 'bottom' ? 1 : -1;
  const posY = useSharedValue(hiddenPositionMultiplier * 100);

  const close = () => {
    posY.value = hiddenPositionMultiplier * 100;
  };
  const show = (msg: string, config?: Partial<ToastConfig>) => {
    console.log('sjow');
    toastConfig = {...toastConfig, ...config};
    setMessage(prev => ({text1: msg, text2: toastConfig.subHeading ?? prev.text2}));
    if (toastConfig.type) {
      setToastType(toastConfig.type);
    }

    posY.value = (toastConfig.position === 'bottom' ? -1 : 1) * toastConfig.bottomOffset;

    if (timeout) {
      clearTimeout(timeout);
    }

    if (toastConfig.autoHide) {
      console.log(';autom');
      const visibleTimeout = toastConfig.timeout;
      timeout = setTimeout(() => {
        posY.value = hiddenPositionMultiplier * 100;
      }, visibleTimeout);
    }
  };
  useImperativeHandle(ref, () => ({close, show}), [close, show]);

  const toastAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(posY.value, {
          damping: 14,
        }),
      },
    ],
  }));

  const toastTypeStyle = {
    success: styles.success,
    error: styles.error,
    info: styles.info,
  };

  const gesture = Gesture.Pan()
    .onUpdate(({translationY}) => {
      posY.value = -1 * hiddenPositionMultiplier * toastConfig.bottomOffset + translationY;
      console.log('onUpdate', posY.value, toastConfig.bottomOffset);
      if (toastConfig.position === 'bottom') {
        if (posY.value >= 30) {
          posY.value = hiddenPositionMultiplier * 100;
        }
      }
      if (toastConfig.position === 'top') {
        if (posY.value <= 30) {
          posY.value = hiddenPositionMultiplier * 100;
        }
      }
    })
    .onEnd(() => {
      if (toastConfig.position === 'bottom') {
        if (posY.value < -20) {
          posY.value = (toastConfig.position === 'bottom' ? -1 : 1) * toastConfig.bottomOffset;
        }
        if (posY.value > 30) {
          posY.value = hiddenPositionMultiplier * 100;
        }
      }
      if (toastConfig.position === 'top') {
        if (posY.value < -20) {
          posY.value = hiddenPositionMultiplier * 100;
        }
        if (posY.value > toastConfig.bottomOffset) {
          posY.value = toastConfig.bottomOffset;
        }
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, toastAnimatedStyle, styles[toastConfig.position]]}>
        <View style={[styles.content, globalStyles.shadow, toastTypeStyle[toastType]]}>
          <View style={styles.textWrapper}>
            <Text style={styles.heading}>{message.text1}</Text>
            {message.text2 && <Text style={styles.subHeading}>{message.text2}</Text>}
          </View>
          <Pressable onPress={close}>
            <Icon name="close" color={COLOR.black} size={30} />
          </Pressable>
        </View>
      </Animated.View>
    </GestureDetector>
  );
});
export default Toast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  top: {top: 0},
  bottom: {bottom: 0},
  content: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderLeftWidth: 4,
    borderRadius: SIZE.radius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {},
  heading: {
    fontSize: 16,
    fontWeight: '600',
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '400',
  },
  success: {
    borderLeftColor: COLOR.primary,
  },
  error: {
    borderLeftColor: COLOR.accent,
  },
  info: {
    borderLeftColor: COLOR.blue,
  },
});
