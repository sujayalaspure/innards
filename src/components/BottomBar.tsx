import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useAppSelector} from '@app/redux/reduxHook';
import {currentScreen, isShowBottomBar} from '@app/redux/reducers/userSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import {navigateToScreen} from '@app/navigation';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {screenWidth} from '@app/utils/scaling_unit';
import {BlurView} from '@react-native-community/blur';

const bottomBarItems = [
  {
    id: '1',
    title: 'Home',
    iconName: 'view-dashboard',
    screenName: 'HomeScreen',
  },
  {
    id: '2',
    title: 'My Plants',
    iconName: 'leaf',
    screenName: 'MyPlantsScreen',
  },
  {
    id: '3',
    title: 'Scanner',
    iconName: 'line-scan',
    screenName: 'ScannerScreen',
  },
  {
    id: '4',
    title: 'Bookmarks',
    iconName: 'bookmark',
    screenName: 'BookmarksScreen',
  },
  {
    id: '5',
    title: 'Cart',
    iconName: 'cart',
    screenName: 'CartScreen',
  },
];

const BottomBar = () => {
  const shouldShowBottomBar = useAppSelector(isShowBottomBar);

  const currentScreenName = useAppSelector(currentScreen);

  const activeBar = useSharedValue(10);

  const activeBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(activeBar.value, {
            duration: 200,
          }),
        },
      ],
    };
  });

  const bottombarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(shouldShowBottomBar ? 0 : 100, {
            duration: 200,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    const index = bottomBarItems.findIndex(item => item.screenName === currentScreenName);
    if (index === -1) {
      return;
    }
    activeBar.value = (screenWidth / 5) * index;

    console.log('currentScreenName', currentScreenName, index);
  }, [currentScreenName]);

  const onPressHandler = (id: string) => {
    activeBar.value = (screenWidth / 5) * (Number(id) - 1);

    switch (id) {
      case '1':
        navigateToScreen('HomeScreen');
        break;
      case '4':
        navigateToScreen('BookmarksScreen');
        break;
      case '5':
        navigateToScreen('CartScreen');
        break;
      default:
        break;
    }
  };

  return (
    <Animated.View style={[styles.container, styles.shadow, bottombarAnimatedStyle]}>
      <Animated.View style={[styles.active, activeBarStyle]} />
      <BlurView
        style={styles.absolute}
        blurType={COLOR.light === 'light' ? 'light' : 'dark'}
        blurAmount={50}
        reducedTransparencyFallbackColor={COLOR.white}
      />
      <View style={styles.optionsWrapper}>
        {bottomBarItems.map(item => (
          <Pressable testID={`pressable_${item.screenName}`} onPress={() => onPressHandler(item.id)} key={item.id}>
            <View style={[styles.item]}>
              <Icon style={styles.icon} name={item.iconName} size={24} color={COLOR.gray} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 6,
  },
  container: {
    height: 34 * 2,

    paddingBottom: 16,
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
  },
  optionsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1 / 0.7,
  },
  icon: {},
  title: {
    fontSize: 12,
    color: COLOR.black,
    marginTop: 4,
  },
  active: {
    borderTopWidth: 2,
    borderTopColor: COLOR.primary,
    position: 'absolute',
    top: 0,
    width: screenWidth / 5,
    zIndex: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 34 * 2,
  },
});
