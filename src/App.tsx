/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';

import {navigatorRef} from '@app/navigation';
import 'react-native-gesture-handler';
import DrawerNavigator from '@app/navigation/DrawerNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistor, store} from '@app/redux/store';
import {isDarkMode} from '@app/theme';
import {Logger} from '@app/utils/Logger';
import Toast, {toastRef} from '@app/components/atoms/Toast';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

if (__DEV__) {
  import('./utils/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

function App(): JSX.Element {
  const isDark = useColorScheme() === 'dark';

  // @ts-ignore
  isDarkMode.current = isDark;

  const handleNavigationReady = () => {
    Logger.log('Navigation is ready!');
    SplashScreen.hide();
    navigatorRef.current?.addListener('beforeRemove', (e: any) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
      }
    });
  };

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={navigatorRef} onReady={handleNavigationReady}>
              <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
              <DrawerNavigator />
              <Toast ref={toastRef} />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
