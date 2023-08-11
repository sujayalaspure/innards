import {screenNameTypes} from '@app/navigation/Navigator';
import {DrawerActions, NavigationProp} from '@react-navigation/native';
import React, {RefObject} from 'react';

export const navigatorRef: RefObject<any> = React.createRef();

export function getNavigator(): NavigationProp<any> {
  return navigatorRef.current;
}

export function navigateToScreen(
  screen: screenNameTypes,
  params?: object | null,
): void {
  navigatorRef.current.navigate(screen, params);
}

export const closeDrawer = (): void => {
  navigatorRef.current.dispatch(DrawerActions.closeDrawer());
};
export const openDrawer = (): void => {
  navigatorRef.current.dispatch(DrawerActions.openDrawer());
};

export const goBack = (): void => {
  navigatorRef.current.goBack();
};
