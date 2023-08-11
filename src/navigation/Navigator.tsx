import {navigatorRef} from '@app/navigation';
import {userSelector} from '@app/redux/reducers/userSlice';
import {useAppSelector} from '@app/redux/reduxHook';
import {
  HomeScreen,
  LoginScreen,
  OnboardingScreen,
  ProductDetailsScreen,
} from '@app/screens';
import AuthOverviewScreen from '@app/screens/Auth/OverviewScreen';
import SettingsScreen from '@app/screens/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

const Stack = createNativeStackNavigator();

export type screenNameTypes =
  | 'OnBoarding'
  | 'HomeScreen'
  | 'AuthOverviewScreen'
  | 'LoginScreen'
  | 'SettingsScreen'
  | 'ProductDetailsScreen';

function Navigator(): JSX.Element {
  // const stackRef = React.useRef(null);
  const {user} = useAppSelector(userSelector);
  console.log('user123', user);

  useEffect(() => {
    const navigationState = navigatorRef.current?.getRootState();
    console.log('navigationState', navigationState);
    const routeNames = navigationState?.routes[0].state.routeNames;
    console.log('routeNames', routeNames);
  }, []);

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
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
      </Stack.Navigator>
    </>
  );
}

export default Navigator;
