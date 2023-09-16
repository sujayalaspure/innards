import {View, StyleSheet} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';

type Props = {
  height?: number | string;
  width?: number | string;
  isBar?: boolean;
  bgColor?: string;
};
const barHeight = 1;

const Separator = ({height = '100%', width = '100%', isBar, bgColor = COLOR.transparent}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height: isBar ? barHeight : height,
          backgroundColor: isBar ? COLOR.lightGray : bgColor,
        },
      ]}
    />
  );
};

export const SpacerW6 = () => <Separator width={6} />;
export const SpacerH70 = () => <Separator height={70} />;
export const SpacerH140 = () => <Separator height={140} />;
export const SpacerW70 = () => <Separator width={70} />;
export const SpacerH20 = () => <Separator height={20} />;

export default React.memo(Separator);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.lightGray,
  },
});
