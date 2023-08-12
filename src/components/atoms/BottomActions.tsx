import {View, StyleSheet} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import Button from '@app/components/atoms/Button';
import Separator from '@app/components/atoms/Separator';
import SIZE from '@app/theme/SIZE';
import COLOR from '@app/theme/COLOR';

type Props = {
  onPrimaryPress?: () => void;
  primaryText: string;
  onSecondaryPress?: () => void;
  secondaryText: string;
};

const BottomActions = ({
  onPrimaryPress,
  onSecondaryPress,
  primaryText,
  secondaryText,
}: Props) => {
  return (
    <View style={styles.bottomAction}>
      <BlurView
        style={styles.absolute}
        blurType={COLOR.light === 'light' ? 'light' : 'dark'}
        blurAmount={30}
        reducedTransparencyFallbackColor={COLOR.white}
      />
      {onSecondaryPress && secondaryText && (
        <>
          <Button
            onPress={onSecondaryPress}
            variant="secondary"
            title={secondaryText}
          />
          <Separator width={20} />
        </>
      )}
      <Button onPress={onPrimaryPress} title={primaryText} />
    </View>
  );
};

export default BottomActions;

const styles = StyleSheet.create({
  bottomAction: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    margin: 26,
    borderRadius: SIZE.radius_md,
    borderWidth: 1,
    borderColor: COLOR.primary,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
