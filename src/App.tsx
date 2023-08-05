/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {navigatorRef} from '@app/navigation';
import 'react-native-gesture-handler';
import DrawerNavigator from '@app/navigation/DrawerNavigator';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const handleNavigationReady = () => {
    console.log('Navigation is ready!');
    SplashScreen.hide();
  };

  return (
    <>
      <NavigationContainer ref={navigatorRef} onReady={handleNavigationReady}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
