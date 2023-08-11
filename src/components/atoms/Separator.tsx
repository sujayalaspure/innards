import {View, StyleSheet} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';

type Props = {
  height?: number | string;
  width?: number | string;
  isBar?: boolean;
};
const barHeight = 1;

const Separator = ({height = '100%', width = '100%', isBar}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height: isBar ? barHeight : height,
          backgroundColor: isBar ? COLOR.lightGray : COLOR.transparent,
        },
      ]}
    />
  );
};

export default React.memo(Separator);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.lightGray,
  },
});
