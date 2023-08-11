import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {influencer} from '@app/assets/images';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import SIZE from '@app/theme/SIZE';
import COLOR from '@app/theme/COLOR';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  heading?: string;
  onPress?: () => void;
};

const InfluencerCard = ({heading, onPress}: Props) => {
  const handlePress = () => {
    onPress && onPress();
  };
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Pressable onPress={handlePress}>
          <LinearGradient
            start={{x: 0, y: 0.9}}
            end={{x: 0.9, y: 0}}
            colors={[
              COLOR.primary + 99,
              COLOR.gradientColor2 + 99,
              COLOR.white + 99,
            ]}
            style={styles.overlay}>
            <Icon name="play-circle-outline" size={50} color={COLOR.white} />
          </LinearGradient>

          <Image
            style={styles.thumbnailImage}
            source={influencer}
            resizeMode="cover"
          />
        </Pressable>
      </View>
      <View style={styles.headingWrapper}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.heading}>
          {heading}
        </Text>
      </View>
    </View>
  );
};

export default InfluencerCard;

const styles = StyleSheet.create({
  container: {
    maxWidth: screenWidth * 0.8,
    borderRadius: SIZE.radius,
    overflow: 'hidden',
    // backgroundColor: COLOR.white,
    margin: moderateScale(4),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // opacity: 0.75,
  },
  videoContainer: {
    borderRadius: SIZE.radius,
    overflow: 'hidden',
  },
  thumbnailImage: {
    // height: moderateScale(150),
    // height: '100%',
    width: '100%',
  },
  headingWrapper: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(10),
  },
  heading: {
    fontSize: moderateScale(15),
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
