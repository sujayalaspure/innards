import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  LoginScreen: {isLogin: boolean; currentScreen: 'login' | 'signup' | 'otp'};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
