import {View, Text, Image} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import {useAppSelector} from '@app/redux/reduxHook';
import {userSelector} from '@app/redux/reducers/userSlice';

type Props = {
  image: string;
};

const IMAGE_SIZE = 160;

const ProfileImage = () => {
  const {user} = useAppSelector(userSelector);
  const fullName = `${user?.name.first || 'NA'} ${user?.name.last || ''}`;
  return (
    <View style={styles.container}>
      <Image source={{uri: user?.picture.medium}} style={styles.image} />
      <Text style={styles.name}>{fullName}</Text>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: screenHeight / 4 - IMAGE_SIZE / 2,
    left: screenWidth / 2 - IMAGE_SIZE / 2,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    backgroundColor: 'red',
    borderRadius: 150,
    overflow: 'hidden',
  },
  name: {
    color: COLOR.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {},
});
