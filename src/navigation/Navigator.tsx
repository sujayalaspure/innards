import {HomeScreen, LoginScreen, OnboardingScreen} from '@app/screens';
import AuthOverviewScreen from '@app/screens/Auth/OverviewScreen';
import Screen2 from '@app/screens/Screen2';
import SettingsScreen from '@app/screens/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Navigator(): JSX.Element {
  return (
    <>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="AuthOverviewScreen"
          component={AuthOverviewScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          initialParams={{isLogin: true}}
        />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </>
  );
}

export default Navigator;
