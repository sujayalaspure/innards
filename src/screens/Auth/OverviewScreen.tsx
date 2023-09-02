import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {image1} from '@app/assets/images';
import {moderateScale, screenHeight, screenWidth} from '@app/utils/scaling_unit';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import Button from '@app/components/atoms/Button';
import SIZE from '@app/theme/SIZE';
import COLOR from '@app/theme/COLOR';
import {navigateToScreen} from '@app/navigation';
import {translate} from '@app/i18n/translate';

const AuthOverviewScreen = () => {
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
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyles]}>
        <Image source={image1} style={styles.image} />
      </Animated.View>
      <View style={styles.content}>
        <View>
          <Text style={styles.headingText}>{translate('overview_heading')}</Text>
          <Text style={styles.subHeadingText}>{translate('overview_subheading')}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title={translate('register')}
            variant="secondary"
            onPress={() => {
              navigateToScreen('LoginScreen', {
                isLogin: false,
              });
            }}
          />
          <Button
            title={translate('login')}
            variant="primary"
            onPress={() => {
              navigateToScreen('LoginScreen', {
                isLogin: true,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
    flex: 1,
  },
  headingText: {
    fontSize: moderateScale(24),
    color: COLOR.black,
    opacity: 0.8,
    fontWeight: '600',
  },
  subHeadingText: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(8),
    marginBottom: moderateScale(50),
    color: COLOR.black,
    opacity: 0.8,
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: moderateScale(8),
    marginBottom: moderateScale(24),
  },
});
