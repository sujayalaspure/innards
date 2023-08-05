import Navigator from '@app/navigation/Navigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const DrawerStack = createDrawerNavigator();

function DrawerNavigator(): JSX.Element {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <DrawerStack.Screen name="Home" component={Navigator} />
    </DrawerStack.Navigator>
  );
}

export default DrawerNavigator;
