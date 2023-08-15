import React, {useCallback} from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import DrawerItem from '@app/components/Drawer/DrawerItem';
import {FlatList, StyleSheet, View} from 'react-native';
import Separator from '@app/components/atoms/Separator';
import ProfileCard from '@app/components/ProfileCard';
import COLOR from '@app/theme/COLOR';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {removeUser, userSelector} from '@app/redux/reducers/userSlice';
import {getNavigator, navigateToScreen} from '@app/navigation';
import {CommonActions} from '@react-navigation/native';

interface Props extends DrawerContentComponentProps {}

const DrawerContent = (props: Props) => {
  const insets = useSafeAreaInsets();
  const {user} = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const content = [
    {
      id: 'my_orders',
      title: 'My Orders',
      iconName: 'shopping-outline',
      onPress: () => {
        navigateToScreen('CartScreen');
      },
    },
    {
      id: 'edit_profile',
      title: 'Edit Profile',
      iconName: 'pencil-outline',
    },
    {id: 'notifications', title: 'Notifications', iconName: 'bell-outline'},
    {
      id: 'transaction_history',
      title: 'Transaction History',
      iconName: 'credit-card-outline',
    },
    {id: 'about', title: 'About', iconName: 'information-outline'},
    {id: 'help', title: 'Help', iconName: 'help-circle-outline'},
    {id: 'settings', title: 'Settings', iconName: 'cog-outline'},
  ];
  const SeparatorBar = useCallback(() => <Separator isBar={true} />, []);
  return (
    <SafeAreaProvider>
      <View style={[styles.container, {paddingTop: insets.top}]}>
        <View style={[styles.contentWrapper]} {...props}>
          <ProfileCard
            name={`${user?.name?.first} ${user?.name?.last}`}
            image={user?.picture?.medium}
            email={user?.email}
          />
          <FlatList
            data={content}
            renderItem={({item}) => <DrawerItem {...item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={SeparatorBar}
            ListFooterComponent={SeparatorBar}
          />
          <DrawerItem
            onPress={() => {
              getNavigator().dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'LoginScreen'}],
                }),
              );
              dispatch(removeUser());
            }}
            isLogout
            {...{id: 'logout', title: 'Logout', iconName: 'logout'}}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: COLOR.transparent,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOR.white,
  },
});
