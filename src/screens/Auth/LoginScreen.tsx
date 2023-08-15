import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';
import {
  screenWidth,
  moderateScale,
  screenHeight,
} from '@app/utils/scaling_unit';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {googleLogo, image1, metaLogo} from '@app/assets/images';
import TextInput from '@app/components/atoms/TextInput';
import Button from '@app/components/atoms/Button';
import LinkText from '@app/components/atoms/LinkText';
import {StackActions, useRoute} from '@react-navigation/native';
import {RootRouteProps} from '@app/utils/types';
import {getNavigator, setShowBottomBar} from '@app/navigation';
import {translate} from '@app/i18n/translate';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {fetchUser, userSelector} from '@app/redux/reducers/userSlice';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
type currentSceneType = 'login' | 'otp' | 'signup';

const LoginScreen = () => {
  const [currentScene, setCurrentScene] = useState<currentSceneType>('login');
  const {params} = useRoute<RootRouteProps<'LoginScreen'>>();
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(userSelector);

  const imagePosition = useSharedValue(-screenHeight);
  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: withSpring(imagePosition.value, {
            damping: 15,
            stiffness: 90,
          }),
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    imagePosition.value = 0;
    setCurrentScene(params.currentScreen);
    setShowBottomBar(false);
  }, []);

  const handleLogin = async () => {
    if (currentScene === 'otp') {
      await dispatch(fetchUser());
      getNavigator()?.dispatch(StackActions.replace('HomeScreen'));
      // navigateToScreen('HomeScreen');
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentScene('otp');
  };

  let CTAButtonText = '';
  let headingText = '';
  let subHeadingText = '';

  if (currentScene === 'login') {
    CTAButtonText = translate('login');
    headingText = translate('login_heading');
    subHeadingText = translate('login_subheading');
  }
  if (currentScene === 'signup') {
    CTAButtonText = translate('signup');
    headingText = translate('signup_heading');
    subHeadingText = translate('signup_subheading');
  }
  if (currentScene === 'otp') {
    headingText = translate('otp_heading');
    subHeadingText = translate('otp_subheading');
    CTAButtonText = translate('confirm');
  }

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? -150 : 0}
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <Animated.View style={[animatedStyles]}>
          <Image source={image1} style={styles.image} />
        </Animated.View>
        <View style={styles.content}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag">
            <Text style={styles.headingText}>{headingText}</Text>
            <Text style={styles.subHeadingText}>
              {subHeadingText}{' '}
              {currentScene === 'signup' && (
                <LinkText
                  textStyle={styles.linkText}
                  title={translate('already_have_acc')}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    setCurrentScene('login');
                  }}
                />
              )}
            </Text>

            <View style={styles.formWrapper}>
              {currentScene === 'signup' && (
                <TextInput placeholder={translate('full_name')} />
              )}
              {currentScene !== 'otp' && (
                <>
                  <TextInput placeholder={translate('email')} />
                  <TextInput
                    placeholder={translate('password')}
                    secureTextEntry
                  />
                </>
              )}
              {currentScene === 'otp' && (
                <TextInput
                  keyboardType="number-pad"
                  placeholder={translate('enter_otp')}
                  autoFocus
                />
              )}

              <Button
                title={CTAButtonText}
                variant="primary"
                onPress={handleLogin}
                isLoading={isLoading}
                disabled={isLoading}
              />
              {currentScene === 'signup' && (
                <Text style={[styles.subHeadingText, styles.textCenter]}>
                  {translate('tnctext')}
                </Text>
              )}
              {currentScene === 'login' && (
                <>
                  <Text style={styles.textCenter}>
                    {translate('dont_have_acc')}{' '}
                    <LinkText
                      title={translate('create_new_acc')}
                      onPress={() => {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut,
                        );
                        setCurrentScene('signup');
                      }}
                    />{' '}
                  </Text>
                  <Button
                    onPress={() => {}}
                    variant="secondary"
                    style={styles.metaBtn}>
                    <Image source={metaLogo} style={styles.icon} />
                    <Text style={styles.metaBtnText}>
                      {translate('connect_with')} META
                    </Text>
                  </Button>
                  <Button
                    onPress={() => {}}
                    variant="secondary"
                    style={styles.googleBtn}>
                    <Image source={googleLogo} style={styles.icon} />
                    <Text style={styles.googleBtnText}>
                      {translate('connect_with')} GOOGLE
                    </Text>
                  </Button>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: screenWidth,
    borderBottomRightRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
  },
  content: {
    paddingHorizontal: moderateScale(SIZE.padding),
    paddingVertical: moderateScale(24),
    flexDirection: 'column',
    minHeight: screenHeight / 2,
    paddingBottom: moderateScale(40),
  },
  headingText: {
    fontSize: moderateScale(24),
    color: COLOR.black,
    opacity: 0.8,
    fontWeight: '600',
  },
  subHeadingText: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(8),
    marginBottom: moderateScale(30),
    color: COLOR.gray,
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: moderateScale(8),
    marginBottom: moderateScale(24),
  },
  formWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: moderateScale(14),
  },
  linkText: {
    alignSelf: 'center',
    fontSize: moderateScale(16),
  },
  textCenter: {
    textAlign: 'center',
  },
  metaBtn: {
    borderColor: COLOR.blue,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: moderateScale(14),
  },
  metaBtnText: {
    color: COLOR.blue,
    fontSize: moderateScale(14),
    flex: 1,
    textAlign: 'center',
  },
  googleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLOR.gray,
    borderWidth: 0,
  },
  googleBtnText: {
    color: COLOR.white,
    fontSize: moderateScale(14),
    flex: 1,
    textAlign: 'center',
  },
});
