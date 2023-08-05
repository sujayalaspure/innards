import Screen1 from '@app/screens/Screen1';
import Screen2 from '@app/screens/Screen2';
import SettingsScreen from '@app/screens/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Navigator(): JSX.Element {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </>
  );
}

export default Navigator;
