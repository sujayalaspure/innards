import DrawerContent from '@app/navigation/DrawerContent';
import Navigator from '@app/navigation/Navigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const DrawerStack = createDrawerNavigator();

function DrawerNavigator(): JSX.Element {
  return (
    <DrawerStack.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStatusBarAnimation: 'slide',
        drawerHideStatusBarOnOpen: false,
        swipeEdgeWidth: 100,
        drawerStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <DrawerStack.Screen name="Home" component={Navigator} />
    </DrawerStack.Navigator>
  );
}

export default DrawerNavigator;
