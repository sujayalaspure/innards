import {View, Text, StyleSheet, Pressable, LayoutAnimation, StatusBar} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import COLOR from '@app/theme/COLOR';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {goBack} from '@app/navigation';
import SIZE from '@app/theme/SIZE';
import SearchBar from '@app/components/SearchBar';
import {Logger} from '@app/utils/Logger';
import {useAppSelector} from '@app/redux/reduxHook';
import {settingsSliceSelector} from '@app/redux/reducers/settingsSlice';
type Props = {
  title?: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  showSearch?: boolean;
  onSearch?: (text: string) => void;
  onSearchEnd?: () => void;
  AdBanner?: ReactNode;
  showAdBanner?: boolean;
  RightSideElement?: ReactNode;
  onRightElementPressed?: () => void;
  autoFocusSearch?: boolean;
  searchPlaceholder?: string;
};

const HeaderBar = ({
  title,
  onBackPress,
  showBackButton,
  showSearch,
  onSearch,
  AdBanner,
  showAdBanner = false,
  RightSideElement,
  onRightElementPressed,
  onSearchEnd,
  autoFocusSearch = false,
  searchPlaceholder,
}: Props) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showInfos, setShowInfos] = useState({
    showBackButton: showBackButton,
    showRightElement: !!RightSideElement,
  });
  const insets = useSafeAreaInsets();
  const {isHeaderVisible} = useAppSelector(settingsSliceSelector);

  console.log({isHeaderVisible});

  const statusBarHeight = insets.top;

  const onBackPressHandler = () => {
    if (onBackPress) {
      onBackPress();
    }
    goBack();
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!isSearchExpanded) {
      setShowInfos({
        showBackButton: showBackButton,
        showRightElement: !!RightSideElement,
      });
    }
  }, [showBackButton, RightSideElement]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [showSearch, showAdBanner]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isSearchExpanded) {
      setShowInfos({showBackButton: false, showRightElement: false});
    } else {
      setShowInfos({
        showBackButton: showBackButton,
        showRightElement: !!RightSideElement,
      });
    }
  }, [isSearchExpanded]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.transparent} />
      <View style={[styles.statusBar, {height: statusBarHeight}]} />
      {!isHeaderVisible && <View style={{height: statusBarHeight}} />}

      {isHeaderVisible && (
        <View style={{backgroundColor: COLOR.white}}>
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
                  <Pressable testID="back_button" onPress={onBackPressHandler}>
                    <Icon name="arrow-left" size={25} color={COLOR.white} />
                  </Pressable>
                </View>
              )}
              {!showInfos.showBackButton && showInfos.showRightElement && !showSearch && <View style={styles.dummy} />}
              {!showSearch && <Text style={styles.title}>{title}</Text>}
              {showSearch && (
                <SearchBar
                  testID="header_search_bar"
                  placeholder={searchPlaceholder}
                  isFocused={autoFocusSearch || isSearchExpanded}
                  onFocus={() => {
                    setIsSearchExpanded(true);
                  }}
                  showMic
                  onSearch={onSearch}
                  onMicPress={() => {
                    const isExp = !isSearchExpanded;
                    setIsSearchExpanded(false);
                    setTimeout(() => {
                      if (isExp) {
                        Logger.log('onMicPress');
                      } else {
                        Logger.log('onClear');
                        onSearchEnd && onSearchEnd();
                      }
                    }, 200);
                  }}
                />
              )}
              {showInfos.showRightElement && (
                <Pressable testID="header_right" onPress={onRightElementPressed}>
                  {RightSideElement}
                </Pressable>
              )}
              {showInfos.showBackButton && !showInfos.showRightElement && !showSearch && <View style={styles.dummy} />}
            </View>
            {showAdBanner && React.isValidElement(AdBanner) && AdBanner}
          </View>
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
