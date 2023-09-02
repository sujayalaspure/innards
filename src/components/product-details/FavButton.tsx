import {Pressable, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import COLOR from '@app/theme/COLOR';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '@app/utils/scaling_unit';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

type Props = {
  isBookmarked?: boolean;
  onPress: () => void;
  testID?: string;
};

const FavButton = ({isBookmarked, onPress, testID}: Props) => {
  const favScale = useSharedValue(0.1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(favScale.value),
        },
      ],
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      favScale.value = 1;
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onFavPress = () => {
    onPress();
    favScale.value = 0.4;
    setTimeout(() => {
      favScale.value = 1;
    }, 200);
  };

  return (
    <Animated.View style={[styles.bookmarkIcon, animatedStyle]}>
      <Pressable testID={`pressable_${testID}`} onPress={onFavPress}>
        <Icon testID={`icon_${testID}`} name={isBookmarked ? 'heart' : 'heart-outline'} size={30} color={COLOR.white} />
      </Pressable>
    </Animated.View>
  );
};

export default FavButton;

const styles = StyleSheet.create({
  bookmarkIcon: {
    padding: moderateScale(12),
    backgroundColor: COLOR.primary,
    borderRadius: moderateScale(40),
    position: 'absolute',
    right: 30,
    top: -20,
    zIndex: 100,
  },
});
