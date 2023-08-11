/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';

import {navigatorRef} from '@app/navigation';
import 'react-native-gesture-handler';
import DrawerNavigator from '@app/navigation/DrawerNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistor, store} from '@app/redux/store';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const handleNavigationReady = () => {
    console.log('Navigation is ready!');
    SplashScreen.hide();
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigatorRef}
            onReady={handleNavigationReady}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <DrawerNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
