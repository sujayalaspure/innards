import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  Image,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import COLOR from '@app/theme/COLOR';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getNavigator, openDrawer} from '@app/navigation';
import SIZE from '@app/theme/SIZE';
import SearchBar from '@app/components/SearchBar';
import {useAppSelector} from '@app/redux/reduxHook';
import {userSelector} from '@app/redux/reducers/userSlice';
type Props = {
  title?: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  hideHeader?: boolean;
  showSearch?: boolean;
  showProfile?: boolean;
  onSearch?: () => void;
  AdBanner?: ReactNode;
  showAdBanner?: boolean;
};

const HeaderBar = ({
  title,
  onBackPress,
  showBackButton,
  hideHeader = false,
  showSearch,
  showProfile = false,
  onSearch,
  AdBanner,
  showAdBanner = false,
}: Props) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const {user} = useAppSelector(userSelector);
  const [showInfos, setShowInfos] = useState({
    showBackButton: showBackButton,
    showProfile: showProfile,
  });
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const onBackPressHandler = () => {
    if (onBackPress) {
      onBackPress();
    }
    getNavigator().goBack();
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowInfos({showBackButton: showBackButton, showProfile: showProfile});
  }, [showBackButton, showProfile]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [hideHeader, showSearch, showAdBanner]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isSearchExpanded) {
      setShowInfos({showBackButton: false, showProfile: false});
    } else {
      setShowInfos({showBackButton: showBackButton, showProfile: showProfile});
    }
  }, [isSearchExpanded]);
  return (
    <>
      <View style={[styles.statusBar, {height: statusBarHeight}]} />

      {!hideHeader && (
        <View
          style={[
            styles.container,
            {
              marginTop: statusBarHeight,
            },
          ]}>
          <View style={[styles.content]}>
            {showInfos.showBackButton && (
              <View style={styles.icon}>
                <Pressable onPress={onBackPressHandler}>
                  <Icon name="arrow-left" size={25} color={COLOR.white} />
                </Pressable>
              </View>
            )}
            {!showInfos.showBackButton &&
              showInfos.showProfile &&
              !showSearch && <View style={styles.dummy} />}
            {!showSearch && <Text style={styles.title}>{title}</Text>}
            {showSearch && (
              <SearchBar
                isFocused={isSearchExpanded}
                onFocus={() => {
                  console.log('onFocus');
                  setIsSearchExpanded(true);
                }}
                showMic
                onSearch={onSearch}
                onMicPress={() => {
                  if (!isSearchExpanded) {
                    console.log('onMicPress');
                  } else {
                    console.log('onClear');
                  }
                  setIsSearchExpanded(false);
                }}
              />
            )}
            {showInfos.showProfile && (
              <Pressable onPress={openDrawer} style={styles.profile}>
                <Image
                  source={{uri: user?.picture?.thumbnail}}
                  style={styles.image}
                />
              </Pressable>
            )}
            {showInfos.showBackButton &&
              !showInfos.showProfile &&
              !showSearch && <View style={styles.dummy} />}
          </View>
          {showAdBanner && React.isValidElement(AdBanner) && AdBanner}
        </View>
      )}
    </>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLOR.primary,
    opacity: 0.4,
    zIndex: 1,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    borderBottomLeftRadius: moderateScale(SIZE.radius_md),
    borderBottomRightRadius: moderateScale(SIZE.radius_md),
    minHeight: moderateScale(50),
    zIndex: 2,
    // flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    padding: moderateScale(10),
    borderBottomLeftRadius: moderateScale(SIZE.radius_md),
    borderBottomRightRadius: moderateScale(SIZE.radius_md),
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLOR.white,
  },
  profile: {
    backgroundColor: COLOR.white,
    borderRadius: moderateScale(25),
    padding: moderateScale(5),
    marginLeft: moderateScale(10),
  },
  image: {width: 30, height: 30, borderRadius: 15},
  dummy: {width: moderateScale(48)},
});
