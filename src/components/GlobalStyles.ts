import COLOR from '@app/theme/COLOR';
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
