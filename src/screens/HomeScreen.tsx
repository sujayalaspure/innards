import {Modal, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import HeaderBar from '@app/components/atoms/HeaderBar';
import Separator from '@app/components/atoms/Separator';
import {StyleSheet} from 'react-native';
import CircularButton from '@app/components/atoms/CircularButton';
import COLOR from '@app/theme/COLOR';
import AdBannerPlace from '@app/components/AdBannerPlace';
import ProductCardVerticle from '@app/components/ProductCardVerticle';
import Section from '@app/components/Section';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {fetchAsyncProducts, useProductSelector} from '@app/redux/reducers/productSlice';
import InfluencerCard from '@app/components/atoms/InfluencerCard';
import {navigateToScreen, openDrawer} from '@app/navigation';
import {Image} from 'react-native';
import {userSelector} from '@app/redux/reducers/userSlice';
import {influencerVideos} from '@app/utils/constants';
import {translate} from '@app/i18n/translate';
import useBottomBar from '@app/hooks/useBottomBar';
import {Logger} from '@app/utils/Logger';
import {DeliveryCard} from '@app/components/atoms';
import {useOrderSelector} from '@app/redux/reducers/orderSlice';
import {showToast} from '@app/components/atoms/Toast';

const topBar = [
  {
    id: '1',
    title: translate('seeds'),
    iconName: 'flower-tulip',
    onPress: () => {
      showToast('Hellow', {type: 'info', subHeading: 'Very good Flowers Seeds', autoHide: false, position: 'bottom'});
    },
  },
  {
    id: '2',
    title: translate('equipments'),
    iconName: 'scissors-cutting',
    onPress: () => {
      showToast('Hellow', {type: 'error', position: 'top'});
    },
  },
  {
    id: '3',
    title: translate('plant_foods'),
    iconName: 'tree',
    onPress: () => {
      showToast('Hellow', {type: 'success'});
    },
  },
  {id: '4', title: translate('seasonal'), iconName: 'calendar-text'},
];

const HomeScreen = () => {
  const {user} = useAppSelector(userSelector);

  const [showAd, setShowAd] = useState(false);
  const dispatch = useAppDispatch();
  const {products, isLoading} = useAppSelector(useProductSelector);
  const {orders} = useAppSelector(useOrderSelector);

  const [isModalVisible, setIsModalVisible] = useState({
    show: false,
    data: {} as any,
  });

  useBottomBar(true, 'HomeScreen');

  useEffect(() => {
    dispatch(fetchAsyncProducts());
    // let timeout: any;
    // let timeout2: any;
    // timeout = setTimeout(() => {
    //   setShowAd(true);
    // }, 1000);
    // timeout2 = setTimeout(() => {
    //   setShowAd(false);
    // }, 6000);
    // return () => {
    //   clearTimeout(timeout);
    //   clearTimeout(timeout2);
    // };
  }, []);

  return (
    <>
      <HeaderBar
        showSearch
        RightSideElement={
          <View style={styles.profile}>
            <Image source={{uri: user?.picture?.thumbnail}} style={styles.image} />
          </View>
        }
        onRightElementPressed={openDrawer}
        title={translate('homescreen')}
        showAdBanner={showAd}
        AdBanner={
          <AdBannerPlace
            cards={[
              <DeliveryCard
                orderStatus={'out-for-delivery'}
                image={orders[0]?.products[0]?.thumbnail}
                title={orders[0]?.products[0]?.title}
              />,
            ]}
            dotColor={COLOR.white}
          />
        }
      />

      <ScrollView style={styles.container}>
        <Separator height={15} />
        <View style={styles.topBar}>
          {topBar.map(item => (
            <View style={styles.topBarButton} key={item.id}>
              <CircularButton
                onPress={
                  item?.onPress ??
                  (() => {
                    setShowAd(!showAd);
                  })
                }
                {...item}
                bgColor={COLOR.primary}
                iconColor={COLOR.white}
              />
              <Text style={styles.topBarIconText}>{item.title}</Text>
            </View>
          ))}
        </View>
        <AdBannerPlace />
        <View style={styles.content}>
          <Section
            isLoading={isLoading}
            id={'trending'}
            scrollEnabled
            title={translate('tranding_today')}
            actionText={translate('see_all')}
            onActionPress={() => {
              navigateToScreen('ProductListScreen', {title: translate('tranding_today')});
            }}>
            {products?.slice(0, 5)?.map((item, i) => (
              <ProductCardVerticle key={i} product={item} />
            ))}
          </Section>
          <Section
            isLoading={isLoading}
            id={'valueforMoney'}
            title={translate('value_for_money')}
            actionText={translate('see_all')}>
            {products?.slice(5, 9)?.map((item, i) => (
              <ProductCardVerticle key={i} product={item} />
            ))}
          </Section>
          <Section id={'influencer'} numColumns={1} scrollEnabled title={translate('watch_our_influencer')}>
            {influencerVideos.map((item, i) => (
              <InfluencerCard onPress={() => Logger.log('onPress')} key={i} {...item} />
            ))}
          </Section>
        </View>
        <Separator height={80} />
      </ScrollView>
      <Modal
        visible={isModalVisible.show}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() =>
          setIsModalVisible({
            show: false,
            data: {},
          })
        }>
        <Text>{JSON.stringify(isModalVisible.data)}</Text>
      </Modal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    paddingHorizontal: moderateScale(16),
  },
  topBar: {
    flexDirection: 'row',
  },
  topBarButton: {
    flex: 1,
    alignItems: 'center',
  },
  topBarIconText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLOR.black,
  },
  image: {width: 30, height: 30, borderRadius: 15},
  profile: {
    backgroundColor: COLOR.white,
    borderRadius: moderateScale(25),
    padding: moderateScale(5),
    marginLeft: moderateScale(10),
  },
});
