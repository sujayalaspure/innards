import BottomBar from '@app/components/BottomBar';
import {userSelector} from '@app/redux/reducers/userSlice';
import {useAppSelector} from '@app/redux/reduxHook';
import {
  BookmarksScreen,
  CartScreen,
  CheckoutScreen,
  FilterScreen,
  HomeScreen,
  LoginScreen,
  OnboardingScreen,
  ProductDetailsScreen,
  ProductListScreen,
} from '@app/screens';
import AuthOverviewScreen from '@app/screens/Auth/OverviewScreen';
import SettingsScreen from '@app/screens/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import * as screens from '../screens';

const Stack = createNativeStackNavigator();

export type screenNameTypes = keyof typeof screens;

function Navigator(): JSX.Element {
  const {user} = useAppSelector(userSelector);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={!user ? 'LoginScreen' : 'HomeScreen'}>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="AuthOverviewScreen"
          component={AuthOverviewScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          initialParams={{currentScreen: 'signup'}}
        />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="BookmarksScreen" component={BookmarksScreen} />
        <Stack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
          initialParams={{
            title: 'Indoor Palm tree',
            category: 'IndoorPalmtree',
          }}
        />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
      <BottomBar />
    </>
  );
}

export default Navigator;
