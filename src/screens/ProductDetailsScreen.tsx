import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  StyleProp,
  ImageStyle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import {moderateScale, screenHeight} from '@app/utils/scaling_unit';
import {Product} from '@app/types/product';
import CoverImages, {
  CoverImagesRef,
} from '@app/components/product-details/CoverImages';
import {Text} from 'react-native';
import COLOR from '@app/theme/COLOR';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import StarRating from '@app/components/atoms/StarRating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {goBack, navigateToScreen, setShowBottomBar} from '@app/navigation';
import SIZE from '@app/theme/SIZE';
import LinearGradient from 'react-native-linear-gradient';
import FeatureCard from '@app/components/product-details/FeatureCard';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {
  addProductToCart,
  useProductSelector,
} from '@app/redux/reducers/productSlice';
import Section from '@app/components/Section';
import ProductCardVerticle from '@app/components/ProductCardVerticle';
import Separator from '@app/components/atoms/Separator';
import BottomActions from '@app/components/atoms/BottomActions';
import {
  toggleBookMark,
  useBookmarkSelector,
} from '@app/redux/reducers/bookmarkSlice';

type ParamList = {
  Params: Product;
};

export interface IImageSlider {
  ImageStyle?: StyleProp<ImageStyle>;
}

const productFeatures = [
  {
    id: '1',
    heading: 'Lighting',
    subHeading: 'Bright Indirect Light',
    icon: 'white-balance-sunny',
  },
  {
    id: '2',
    heading: 'Water',
    subHeading: 'Water once a week',
    icon: 'water',
  },
  {
    id: '3',
    heading: 'Temperature',
    subHeading: 'Room temperature',
    icon: 'thermometer-low',
  },
  {
    id: '4',
    heading: 'Special feature',
    subHeading: 'Air purifying',
    icon: 'air-filter',
  },
];

const ProductDetailsScreen = () => {
  const [isOnTop, setIsOnTop] = useState(false);
  const [currentCoverImageIdx, setCurrentCoverImageIdx] = useState(0);

  const sheetRef = useRef<BottomSheetRef>(null);
  const coverImageRef = useRef<CoverImagesRef>(null);
  const thumbnailsRef = useRef<FlatList>(null);

  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const {products, cart} = useAppSelector(useProductSelector);
  const {bookmarks} = useAppSelector(useBookmarkSelector);
  const isBookmarked = bookmarks.find(item => item.id === params.id);
  const dispatch = useAppDispatch();
  const isFocus = useIsFocused();

  const isAddedToCart = cart.find(item => item.id === params.id);

  useEffect(() => {
    sheetRef.current?.scrollTo(screenHeight * 0.53);
    if (isFocus) {
      setShowBottomBar(false);
    }
  }, [isFocus]);

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
      <LinearGradient
        style={styles.backdropGradient}
        colors={[COLOR.gradientColor2 + '00', COLOR.primary]}
      />

      <BottomSheet
        canClose={false}
        ref={sheetRef}
        onTopReached={value => {
          if (value !== isOnTop) {
            setIsOnTop(value);
          }
        }}
        maxTopPosition={screenHeight * 0.8}
        maxBottomPosition={screenHeight * 0.53}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isOnTop}
          scrollEventThrottle={32}
          onScroll={e => {
            updateShouldScroll(e.nativeEvent.contentOffset.y);
          }}>
          <View style={styles.contentWrapper}>
            <View style={styles.headingWrapper}>
              <View style={styles.flex}>
                <Text style={styles.title}>{params.title}</Text>
                <StarRating rating={params.rating} />
              </View>
              <Pressable
                style={styles.bookmarkIcon}
                onPress={() => dispatch(toggleBookMark(params))}>
                <Icon
                  name={isBookmarked ? 'heart' : 'heart-outline'}
                  size={30}
                  color={COLOR.primary}
                />
              </Pressable>
            </View>
            <Text style={styles.description}>{params.description}</Text>
            {params.images && (
              <FlatList
                ref={thumbnailsRef}
                data={params.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.thumbnail,
                      index === currentCoverImageIdx && styles.activeThumbnail,
                    ]}
                    onPress={() => onThumbnailPress(index)}>
                    <Image
                      style={styles.thumbnailImage as ImageStyle}
                      resizeMode="cover"
                      source={{uri: item}}
                    />
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
          primaryText="Buy Now"
          onPrimaryPress={async () => {
            dispatch(addProductToCart({...params, quantity: 1}));
            navigateToScreen('CartScreen');
          }}
          secondaryText={
            isAddedToCart
              ? `Added ${isAddedToCart.quantity} items`
              : 'Add to Cart'
          }
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
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: COLOR.gray,
  },
  headingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  bookmarkIcon: {
    padding: moderateScale(8),
    paddingTop: moderateScale(0),
  },
  featureWrapper: {
    marginTop: moderateScale(10),
  },
});
