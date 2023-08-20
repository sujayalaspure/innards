import {View} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';
import Chip from '@app/components/atoms/Chip';

type Props = {
  isShadow?: boolean;
  children: React.ReactNode;
  chipText?: string;
};

const Card = ({isShadow, chipText, children}: Props) => {
  return (
    <View style={[styles.container, isShadow && styles.shadow]}>
      {chipText && <Chip title={chipText} isSelected style={styles.chip} />}
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: COLOR.gray + '99',
    borderRadius: SIZE.radius,
    padding: 10,
    backgroundColor: COLOR.white,
  },
  shadow: {
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0,
  },
  chip: {
    position: 'absolute',
    top: -14,
    right: 20,
    borderRadius: 6,
  },
});
