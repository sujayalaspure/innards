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
import {
  fetchAsyncProducts,
  useProductSelector,
} from '@app/redux/reducers/productSlice';
import InfluencerCard from '@app/components/atoms/InfluencerCard';
import {navigateToScreen, openDrawer, setShowBottomBar} from '@app/navigation';
import {Image} from 'react-native';
import {userSelector} from '@app/redux/reducers/userSlice';
import {useIsFocused} from '@react-navigation/native';

const topBar = [
  {id: '1', title: 'Seeds', iconName: 'flower-tulip'},
  {id: '2', title: 'Equipments', iconName: 'scissors-cutting'},
  {id: '3', title: 'Plant Food', iconName: 'tree'},
  {id: '4', title: 'Seasonal', iconName: 'calendar-text'},
];

const HomeScreen = () => {
  const {user} = useAppSelector(userSelector);

  const [showAd, setShowAd] = useState(false);
  const dispatch = useAppDispatch();
  const {products} = useAppSelector(useProductSelector);
  const isFocus = useIsFocused();

  const [isModalVisible, setIsModalVisible] = useState({
    show: false,
    data: {} as any,
  });

  useEffect(() => {
    if (isFocus) {
      setShowBottomBar(true, 'HomeScreen');
    }
  }, [isFocus]);

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
            <Image
              source={{uri: user?.picture?.thumbnail}}
              style={styles.image}
            />
          </View>
        }
        onRightElementPressed={openDrawer}
        title="HomeScreen"
        showAdBanner={showAd}
        // AdBanner={
        //   <DeliveryCard
        //     title={products[0].title}
        //     image={products[0].thumbnail}
        //   />
        // }
      />

      <ScrollView style={styles.container}>
        <Separator height={15} />
        <View style={styles.topBar}>
          {topBar.map(item => (
            <View style={styles.topBarButton} key={item.id}>
              <CircularButton
                onPress={() => {
                  setShowAd(!showAd);
                }}
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
            id={'trending'}
            scrollEnabled
            title="Trending Today"
            actionText="See All"
            onActionPress={() => {
              navigateToScreen('ProductListScreen', {title: 'Trending Today'});
            }}>
            {products?.slice(0, 5)?.map((item, i) => (
              <ProductCardVerticle key={i} product={item} />
            ))}
          </Section>
          <Section
            id={'valueforMoney'}
            title="Value for Money"
            actionText="See All">
            {products?.slice(5, 9)?.map((item, i) => (
              <ProductCardVerticle key={i} product={item} />
            ))}
          </Section>
          <Section
            id={'influencer'}
            numColumns={1}
            scrollEnabled
            title="Watch Our Influencers"
            actionText="See All">
            {[1, 2, 3].map((_, i) => (
              <InfluencerCard
                onPress={() => console.log('onPress')}
                key={i}
                heading="House plant tips for beginners - 7 Mistakes to avoid. "
              />
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
