import DrawerContent from '@app/navigation/DrawerContent';
import Navigator from '@app/navigation/Navigator';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {useCallback} from 'react';

const DrawerStack = createDrawerNavigator();

function DrawerNavigator(): JSX.Element {
  const RenderDrawerContent = useCallback(
    (props: DrawerContentComponentProps) => <DrawerContent {...props} />,
    [],
  );

  return (
    <DrawerStack.Navigator
      drawerContent={RenderDrawerContent}
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
