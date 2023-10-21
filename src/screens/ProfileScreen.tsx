import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import ProfileHeader from '@app/components/profile/ProfileHeader';
import {screenHeight, screenWidth} from '@app/utils/scaling_unit';
import {image1} from '@app/assets/images';
import {translate} from '@app/i18n/translate';
import {navigateToScreen} from '@app/navigation';
import {Linking} from 'react-native';
import DrawerItem from '@app/components/Drawer/DrawerItem';
import ProfileImage from '@app/components/profile/ProfileImage';
import useBottomBar from '@app/hooks/useBottomBar';

type Props = {};

const BOTTOM_SHEET_HEIGHT = screenHeight * 0.49;

const contentList = [
  {
    id: 'my_orders',
    title: translate('my_orders'),
    iconName: 'shopping-outline',
    onPress: () => {
      navigateToScreen('OrdersScreen');
    },
  },
  {
    id: 'edit_profile',
    title: translate('edit_profile'),
    iconName: 'pencil-outline',
    onPress: () => {
      navigateToScreen('ProfileScreen');
    },
  },
  {
    id: 'language',
    title: translate('change_language'),
    iconName: 'wechat',
    onPress: () => {},
  },
  {
    id: 'password',
    title: translate('change_password'),
    iconName: 'lock-outline',
    onPress: () => {},
  },
  {
    id: 'settings',
    title: translate('settings'),
    iconName: 'cog-outline',
    onPress: () => {
      Linking.openSettings();
    },
  },
];

const ProfileScreen = (props: Props) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  useBottomBar(false);

  useEffect(() => {
    sheetRef.current?.scrollTo(BOTTOM_SHEET_HEIGHT);
  }, []);

  return (
    <>
      {/* <StatusBar animated barStyle={'dark-content'} /> */}

      <View style={styles.backgroundImage}>
        <Image source={image1} style={styles.image} />
        <ProfileImage />
      </View>
      <View style={styles.container}>
        <ProfileHeader
          testID={'profile_header'}
          onPress={() => {
            sheetRef.current?.open();
          }}
        />
      </View>
      <BottomSheet
        canClose={false}
        ref={sheetRef}
        sheetHeight={BOTTOM_SHEET_HEIGHT}
        snapPoints={{
          top: BOTTOM_SHEET_HEIGHT,
          bottom: BOTTOM_SHEET_HEIGHT,
        }}>
        <View style={styles.content}>
          <Text style={styles.title}>{translate('account_overview')}</Text>
          {contentList.map(item => (
            <DrawerItem testID={item.id} {...item} />
          ))}
        </View>
      </BottomSheet>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  backgroundImage: {
    position: 'absolute',
  },
  image: {
    width: screenWidth,
  },
  content: {
    paddingHorizontal: 5,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
  },
});
