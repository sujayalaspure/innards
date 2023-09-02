import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';

type Props = {
  name: string;
  image?: string;
  email?: string;
  onPress?: () => void;
};

const profileImageHeight = moderateScale(45);

const ProfileCard = ({name, image, email}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImage}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    borderBottomColor: COLOR.lightGray,
    borderBottomWidth: 8,
  },
  profileImage: {
    marginRight: moderateScale(10),
    backgroundColor: COLOR.primary,
    borderRadius: (profileImageHeight + 10) / 2,
    padding: moderateScale(5),
  },
  image: {
    height: profileImageHeight,
    width: profileImageHeight,
    borderRadius: profileImageHeight / 2,
  },
  profileContent: {},
  profileName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLOR.black,
  },
  profileEmail: {
    fontSize: moderateScale(12),
    fontWeight: '300',
    color: COLOR.black,
    opacity: 0.8,
  },
});
