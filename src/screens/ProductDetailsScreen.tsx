/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Pressable, Image, FlatList, StyleProp, ImageStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {RouteProp, useRoute} from '@react-navigation/native';
import {moderateScale, screenHeight} from '@app/utils/scaling_unit';
import {Product} from '@app/types/product';
import CoverImages, {CoverImagesRef} from '@app/components/product-details/CoverImages';
import COLOR from '@app/theme/COLOR';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import {goBack, navigateToScreen} from '@app/navigation';
import SIZE from '@app/theme/SIZE';
import FeatureCard from '@app/components/product-details/FeatureCard';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {addProductToCart, useProductSelector} from '@app/redux/reducers/productSlice';
import {Section, ProductCardVerticle} from '@app/components';
import {toggleBookMark, useBookmarkSelector} from '@app/redux/reducers/bookmarkSlice';
import {productFeatures} from '@app/utils/constants';
import {StarRating, Separator, BottomActions} from '@app/components/atoms';
import FavButton from '@app/components/product-details/FavButton';
import useBottomBar from '@app/hooks/useBottomBar';
import Animated, {AnimatedRef, useAnimatedStyle, useSharedValue, withDelay, withTiming} from 'react-native-reanimated';

type ParamList = {
  Params: Product;
};

export interface IImageSlider {
  ImageStyle?: StyleProp<ImageStyle>;
}

const ProductDetailsScreen = () => {
  const [isOnTop, setIsOnTop] = useState(false);
  const [currentCoverImageIdx, setCurrentCoverImageIdx] = useState(0);

  const sheetRef = useRef<BottomSheetRef>(null);
  const coverImageRef = useRef<CoverImagesRef>(null);
  // @ts-ignore
  const thumbnailsRef = useRef<AnimatedRef>(null);

  const opacityHeading = useSharedValue(0);
  const opacityDescription = useSharedValue(0);
  const opacityThumbnailImages = useSharedValue(0);

  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const {products, cart} = useAppSelector(useProductSelector);
  const {bookmarks} = useAppSelector(useBookmarkSelector);
  const dispatch = useAppDispatch();
  useBottomBar(false);

  const isBookmarked = bookmarks.some(item => item.id === params.id);

  const isAddedToCart = cart.find(item => item.id === params.id);

  const animatedHeadingStyle = useAnimatedStyle(() => ({opacity: opacityHeading.value}));
  const animatedDescriptionStyle = useAnimatedStyle(() => ({opacity: opacityDescription.value}));
  const animatedImagesStyle = useAnimatedStyle(() => ({opacity: opacityThumbnailImages.value}));

  useEffect(() => {
    sheetRef.current?.scrollTo(screenHeight * 0.53);
    opacityHeading.value = withDelay(200, withTiming(1, {duration: 500}));
    opacityDescription.value = withDelay(450, withTiming(1, {duration: 500}));
    opacityThumbnailImages.value = withDelay(700, withTiming(1, {duration: 500}));
  }, []);

  const updateShouldScroll = (position: number) => {
    if (position === 0) {
      setIsOnTop(false);
    }
  };

  const onThumbnailPress = (index: number) => {
    coverImageRef.current?.scrollTo(index);
  };

  return (
    <View>
      <Pressable
        testID="back_button"
        style={styles.backButton}
        onPress={() => {
          goBack();
        }}>
        <Icon name="chevron-left" size={30} color={COLOR.black} />
      </Pressable>
      <CoverImages
        onScroll={i => {
          setCurrentCoverImageIdx(i);
          thumbnailsRef.current?.scrollToIndex({
            index: i,
            animated: true,
            viewPosition: 0.5,
          });
        }}
        ref={coverImageRef}
        images={params.images}
      />
      <LinearGradient style={styles.backdropGradient} colors={[COLOR.gradientColor2 + '00', COLOR.primary]} />

      <BottomSheet
        canClose={false}
        ref={sheetRef}
        onTopReached={value => {
          if (value !== isOnTop) {
            setIsOnTop(value);
          }
        }}
        sheetHeight={screenHeight * 0.8}
        snapPoints={{
          top: screenHeight * 0.8,
          bottom: screenHeight * 0.53,
        }}>
        <FavButton testID="fav_button" onPress={() => dispatch(toggleBookMark(params))} isBookmarked={isBookmarked} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isOnTop}
          scrollEventThrottle={32}
          onScroll={e => {
            updateShouldScroll(e.nativeEvent.contentOffset.y);
          }}>
          <View style={styles.contentWrapper}>
            <Animated.View style={[styles.headingWrapper, animatedHeadingStyle]}>
              <Text testID="product_title" style={styles.title}>
                {params.title}
              </Text>
              <StarRating rating={params.rating} />
            </Animated.View>
            <Animated.Text style={[styles.description, animatedDescriptionStyle]}>{params.description}</Animated.Text>
            {params.images && (
              <Animated.FlatList
                style={animatedImagesStyle}
                ref={thumbnailsRef}
                data={params.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <Pressable
                    key={index}
                    style={[styles.thumbnail, index === currentCoverImageIdx && styles.activeThumbnail]}
                    onPress={() => onThumbnailPress(index)}>
                    <Image style={styles.thumbnailImage as ImageStyle} resizeMode="cover" source={{uri: item}} />
                  </Pressable>
                )}
              />
            )}
            <View style={styles.featureWrapper}>
              <FlatList
                contentContainerStyle={styles.gap}
                scrollEnabled={false}
                horizontal={false}
                key={2}
                columnWrapperStyle={styles.gap}
                numColumns={2}
                data={productFeatures}
                renderItem={({item}) => <FeatureCard {...item} />}
              />
            </View>
            <Section id={'related'} title="Related Products">
              {products?.slice(0, 4)?.map((item, i) => (
                <ProductCardVerticle key={i} product={item} />
              ))}
            </Section>
          </View>
          <Separator height={80} />
        </ScrollView>
        <BottomActions
          testID={{
            primaryButton: 'buy_now',
            secondaryButton: 'add_to_cart',
          }}
          primaryText={isAddedToCart ? 'Go to Cart' : 'Buy Now'}
          onPrimaryPress={async () => {
            dispatch(addProductToCart({...params, quantity: Number(!isAddedToCart)}));
            navigateToScreen('CartScreen');
          }}
          secondaryText={isAddedToCart ? `Added ${isAddedToCart.quantity} items` : 'Add to Cart'}
          onSecondaryPress={() => {
            dispatch(addProductToCart({...params, quantity: 1}));
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 16,
    backgroundColor: COLOR.white,
  },
  thumbnail: {
    backgroundColor: COLOR.white,
    flex: 1,
    margin: 8,
    borderRadius: SIZE.radius,
    borderColor: COLOR.primary,
    borderWidth: 1,
  },
  // @ts-ignore
  gap: {gap: 10},
  flex: {flex: 1},
  backdropGradient: {
    height: screenHeight,
    width: '100%',
  },
  activeThumbnail: {
    borderColor: COLOR.primaryDark,
    shadowColor: COLOR.primaryDark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  thumbnailImage: {
    borderRadius: SIZE.radius,
    height: 100,
    width: 100,
  },
  backButton: {
    position: 'absolute',
    top: moderateScale(54),
    left: 16,
    zIndex: 1,
    backgroundColor: COLOR.white + '77',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: COLOR.gray,
  },
  headingWrapper: {
    flex: 1,
    marginBottom: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  description: {
    fontSize: moderateScale(14),
    fontWeight: '300',
    color: COLOR.black,
    opacity: 0.8,
    marginBottom: moderateScale(10),
  },

  featureWrapper: {
    marginTop: moderateScale(10),
  },
});
