import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {mapImage} from '@app/assets/images';
import {screenWidth} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Separator from '@app/components/atoms/Separator';
import {OrderStatus} from '@app/types/order';
import {translate} from '@app/i18n/translate';

type Props = {
  title: string;
  image: string;
  orderStatus?: OrderStatus;
};

const DeliveryCard = ({title, image, orderStatus}: Props) => {
  const contWidth = screenWidth < 400 ? screenWidth - 32 : 390;

  // @ts-ignore
  let orderStatusText = translate(orderStatus?.replaceAll('-', '_'));

  return (
    <View style={[styles.container, {width: contWidth}]}>
      <Image style={styles.mapImage} source={mapImage} resizeMode="stretch" />

      <LinearGradient
        start={{x: 0, y: 0.1}}
        end={{x: 0.9, y: 0.9}}
        locations={[0, 0.6, 1]}
        colors={[COLOR.primary + 'ff', COLOR.primary + '88', COLOR.primary + '33']}
        style={styles.absolute}
      />
      <View style={styles.content}>
        <View style={styles.leftSide}>
          <Text style={styles.heading}>Your Order is {orderStatusText}</Text>
          <View style={styles.productInfo}>
            <Image style={styles.productImage} source={{uri: image}} resizeMode="cover" />
            <Text style={styles.productTitle} numberOfLines={3}>
              {title}
            </Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Separator width={1} height={'70%'} bgColor={COLOR.white} />
          <Separator width={10} />
          <Icon name="truck-delivery" size={70} color={COLOR.white + 'cc'} />
        </View>
      </View>
    </View>
  );
};

export default DeliveryCard;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  content: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  leftSide: {
    flex: 0.7,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.white,
  },
  productInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.white,
    marginLeft: 10,
    flexShrink: 1,
  },
  productImage: {
    height: 80,
    // width: 100,
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
  rightSide: {
    flex: 0.3,
    // backgroundColor: 'yellow',
    // borderLeftWidth: 1,
    // borderLeftColor: COLOR.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {},
});
