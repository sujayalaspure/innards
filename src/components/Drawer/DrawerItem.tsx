import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';
import {closeDrawer} from '@app/navigation';

type Props = {
  id: string;
  title: string;
  onPress?: (t: String) => void;
  iconName: string;
  isLogout?: boolean;
};

const DrawerItem = ({id, title, onPress, iconName, isLogout}: Props) => {
  const itemref = useRef(null);
  const onItemPress = () => {
    closeDrawer();
    if (onPress) {
      onPress(id);
    }
  };
  return (
    <Pressable onPress={onItemPress}>
      <View
        ref={itemref}
        style={[styles.container, isLogout && styles.logoutStyle]}>
        <View style={styles.icon}>
          <Icon color={COLOR.white} name={iconName} size={30} />
        </View>
        <Text style={styles.title}>{title}</Text>

        {!isLogout && (
          <Icon name={'chevron-right'} size={30} color={COLOR.gray} />
        )}
      </View>
    </Pressable>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
  icon: {
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
    backgroundColor: COLOR.primary,
    marginRight: moderateScale(10),
    aspectRatio: 1 / 1,
  },
  title: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '300',
    color: COLOR.black,
    opacity: 0.8,
  },
  logoutStyle: {
    margin: moderateScale(20),
    borderWidth: 1,
    borderColor: COLOR.primary,
    borderRadius: moderateScale(SIZE.radius),
  },
});
