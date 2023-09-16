import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import AdCardMask from '@app/assets/svg/AdCardMask';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';
import {adCardimage} from '@app/assets/images';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import {translate} from '@app/i18n/translate';

type Props = {
  heading?: string;
  subHeading?: string;
  promoCode?: string;
  onActionPress?: () => void;
  actionText?: string;
};

const AdCard = ({heading, subHeading, promoCode = '', actionText}: Props) => {
  const contWidth = screenWidth < 400 ? screenWidth - 32 : 390;
  return (
    <View style={[styles.container, {width: contWidth}]}>
      <View style={styles.mask}>
        <AdCardMask color1={COLOR.primary} color2={COLOR.gradientColor2} />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
        <View style={styles.promoCode}>
          {promoCode?.length < 10 && <Text style={styles.promoCodeText}>{translate('promo_code')} -</Text>}
          <Text style={styles.promoCodeText}>{promoCode}</Text>
        </View>
        <Pressable style={styles.actionbutton}>
          <Text style={styles.subHeading}>{actionText}</Text>
        </Pressable>
      </View>
      <View style={styles.image}>
        <Image style={styles.adCardImage} resizeMode="stretch" source={adCardimage} />
      </View>
    </View>
  );
};

export default AdCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZE.radius,
    overflow: 'hidden',
    // marginVertical: SIZE.padding,
    flexDirection: 'row',
    // height: 173,
    // minWidth: screenWidth - 32,
    // backgroundColor: 'yellow',
    // paddingHorizontal: SIZE.padding,
  },
  mask: {
    // height: 173,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  image: {
    // height: 173,
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: 0,
    zIndex: -1,
  },
  contentWrapper: {
    minHeight: 173,
    padding: moderateScale(10),
    // maxWidth: 164,
    flex: 0.4,
    flexDirection: 'column',
    gap: moderateScale(4),
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLOR.white,
  },
  subHeading: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: COLOR.white,
  },
  promoCode: {
    borderRadius: SIZE.radius / 2,
    borderColor: COLOR.white,
    borderWidth: 2,
    padding: moderateScale(4),
    borderStyle: 'dashed',
    flexDirection: 'row',
    overflow: 'scroll',
    justifyContent: 'center',
  },
  promoCodeText: {
    fontSize: moderateScale(10),
    fontWeight: '400',
    color: COLOR.white,
  },
  actionbutton: {
    backgroundColor: COLOR.primaryDark,
    borderRadius: SIZE.radius,
    paddingVertical: moderateScale(8),
    alignItems: 'center',
    marginTop: moderateScale(8),
  },
  adCardImage: {height: '100%', flex: 1},
});
