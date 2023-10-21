import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate} from '../../i18n/translate';
import COLOR from '../../theme/COLOR';
import {Pressable} from 'react-native';
import {goBack} from '../../navigation';

export default function ProfileHeader({onPress, testID}) {
  return (
    <View style={styles.header}>
      <Pressable testID="back_button" style={styles.backButton} onPress={goBack}>
        <Icon name="chevron-left" size={30} color={COLOR.black} />
      </Pressable>
      <Text testID={`text_${testID}`} style={styles.title}>
        {translate('profile')}
      </Text>
      <Pressable testID={`pressable_${testID}`} onPress={onPress} style={styles.iconWrapper}>
        <Icon name="dots-vertical" size={30} color={COLOR.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  backButton: {
    zIndex: 1,
    backgroundColor: COLOR.white + '77',
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: COLOR.gray,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.white,
    textAlign: 'center',
  },
  iconWrapper: {
    borderRadius: 50,
    backgroundColor: COLOR.lightGray + '33',
    borderColor: COLOR.gray,
    borderWidth: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  icon: {},
});
