import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  LoginScreen: {isLogin: boolean};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
