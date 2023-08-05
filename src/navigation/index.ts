import React, {RefObject} from 'react';

export const navigatorRef: RefObject<any> = React.createRef();

export function getNavigator(): any {
  return navigatorRef.current;
}

export function navigateToScreen(screen: string, params?: object | null): void {
  navigatorRef.current.navigate(screen, params);
}
