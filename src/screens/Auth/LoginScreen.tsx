import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
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
import {useRoute} from '@react-navigation/native';
import {RootRouteProps} from '@app/utils/types';
import {navigateToScreen} from '@app/navigation';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LoginScreen = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const {params} = useRoute<RootRouteProps<'LoginScreen'>>();

  const headingText = isLoginPage ? 'Welcome to Innards' : 'Create Account';
  const subHeadingText = isLoginPage
    ? 'Enter your Phone number or Email address for sign in and make your world green'
    : 'Enter your Name, Email and Password for sign up.';

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
    setIsLoginPage(params?.isLogin);
  }, []);

  const handleLogin = () => {
    navigateToScreen('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyles}>
        <Image source={image1} style={styles.image} />
      </Animated.View>
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.headingText}>{headingText}</Text>
          <Text style={styles.subHeadingText}>
            {subHeadingText}
            {!isLoginPage && (
              <LinkText
                textStyle={styles.linkText}
                title=" Already have account?"
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setIsLoginPage(true);
                }}
              />
            )}
          </Text>

          <View style={styles.formWrapper}>
            {!isLoginPage && <TextInput placeholder="Full Name" />}
            <TextInput placeholder="Email Address" />
            <TextInput placeholder="Password" secureTextEntry />
            <Button
              title={isLoginPage ? 'Sign in' : 'Sign up'}
              variant="primary"
              onPress={handleLogin}
            />
            {!isLoginPage && (
              <Text style={[styles.subHeadingText, styles.textCenter]}>
                By Signing up you agree to our Terms Conditions & Privacy
                Policy.
              </Text>
            )}
            {isLoginPage && (
              <>
                <Text style={styles.textCenter}>
                  Don’t have account?{' '}
                  <LinkText
                    title="Create new account."
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setIsLoginPage(false);
                    }}
                  />{' '}
                </Text>
                <Button
                  onPress={() => {}}
                  variant="secondary"
                  style={styles.metaBtn}>
                  <Image source={metaLogo} style={styles.icon} />
                  <Text style={styles.metaBtnText}>CONNECT WITH META</Text>
                </Button>
                <Button
                  onPress={() => {}}
                  variant="secondary"
                  style={styles.googleBtn}>
                  <Image source={googleLogo} style={styles.icon} />
                  <Text style={styles.googleBtnText}>CONNECT WITH GOOGLE</Text>
                </Button>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
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
