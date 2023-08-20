import {setCurrentScreen, toggleBottomBar} from '@app/redux/reducers/userSlice';
import {store} from '@app/redux/store';
import {
  DrawerActions,
  NavigationProp,
  StackActions,
} from '@react-navigation/native';
import React, {RefObject} from 'react';
import * as screens from '../screens';

export type screenNameTypes = keyof typeof screens;
export const navigatorRef: RefObject<any> = React.createRef();

export function getNavigator(): NavigationProp<any> {
  return navigatorRef.current;
}

export function navigateToScreen(
  screen: screenNameTypes,
  params?: object | undefined,
): void {
  store.dispatch(setCurrentScreen(screen));
  navigatorRef.current.navigate(screen, params);
}

export function pushToScreen(
  screen: screenNameTypes,
  params?: object | undefined,
): void {
  navigatorRef.current.dispatch(StackActions.push(screen, params));
}

export const closeDrawer = (): void => {
  navigatorRef.current.dispatch(DrawerActions.closeDrawer());
};
export const openDrawer = (): void => {
  navigatorRef.current.dispatch(DrawerActions.openDrawer());
};

export const goBack = (): void => {
  // const routes = navigatorRef.current?.getState().routes[0].state.routes;
  // console.log('routes', navigatorRef.current);
  navigatorRef.current.goBack();
};

export const setShowBottomBar = (
  show: boolean,
  screen?: screenNameTypes,
): void => {
  store.dispatch(toggleBottomBar(show));
  if (screen) {
    store.dispatch(setCurrentScreen(screen));
  }
};
