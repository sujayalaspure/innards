import {View, FlatList, Pressable} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import COLOR from '@app/theme/COLOR';
import {moderateScale} from '@app/utils/scaling_unit';
import Chip from '@app/components/atoms/Chip';
import {SpacerH20, SpacerH70, SpacerW6} from '@app/components/atoms/Separator';
import Animated, {
  Easing,
  SlideInRight,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useAppSelector} from '@app/redux/reduxHook';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import ProductCardVerticle from '@app/components/ProductCardVerticle';
import {BlurView} from '@react-native-community/blur';
import {navigateToScreen, setShowBottomBar} from '@app/navigation';
import ProductCardHorizontal from '@app/components/ProductCardHorizontal';
type Props = {
  title: string;
  category: string;
};

type ParamList = {
  Params: Props;
};

const categoryTags = ['All', 'Seeds', 'Equipments', 'Plant Food', 'Seasonal'];

const ProductListScreen = () => {
  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);
  const tagsListRef = useRef<FlatList>(null);
  const [activeView, setActiveView] = useState(0);

  const {products} = useAppSelector(useProductSelector);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      setShowBottomBar(true);
    }
  }, [isFocus]);

  const onTagSelect = (index: number) => {
    setSelectedTagIndex(index);
    tagsListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(activeView === 0 ? 1 : 31, {
            duration: 200,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });

  const renderItems = ({item, index}: {item: any; index: number}) => {
    if (activeView === 0) {
      return <ProductCardVerticle key={index} product={item} />;
    } else {
      return (
        <ProductCardHorizontal inView="listScreen" key={index} product={item} />
      );
    }
  };

  const RenderProduct = useCallback(() => {
    if (activeView === 0) {
      return (
        <FlatList
          ListHeaderComponent={SpacerH70}
          data={products?.slice(0, 10)}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
          renderItem={renderItems}
          ListFooterComponent={SpacerH70}
        />
      );
    } else {
      return (
        <FlatList
          contentContainerStyle={styles.flatlistContent}
          style={styles.flatlist}
          ListHeaderComponent={SpacerH70}
          ListFooterComponent={SpacerH70}
          ItemSeparatorComponent={SpacerH20}
          data={products?.slice(0, 10)}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          renderItem={renderItems}
        />
      );
    }
  }, [activeView, products]);

  return (
    <>
      <HeaderBar
        showBackButton
        title={params.title}
        RightSideElement={
          <View style={styles.filterIcon}>
            <Icon name="tune" size={25} color={COLOR.primaryDark} />
          </View>
        }
        onRightElementPressed={() => {
          navigateToScreen('FilterScreen');
        }}
      />
      <View style={styles.container}>
        <View style={styles.list}>
          <RenderProduct />
        </View>

        <View style={styles.tagNViewWrapper}>
          <BlurView
            style={styles.absolute}
            blurType={COLOR.light === 'light' ? 'light' : 'dark'}
            blurAmount={70}
            reducedTransparencyFallbackColor={COLOR.white}
          />
          <Animated.View
            entering={SlideInRight.delay(100).springify().damping(14)}
            style={styles.tagsWrapper}>
            <FlatList
              ref={tagsListRef}
              data={categoryTags}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={SpacerW6}
              ListFooterComponent={SpacerH70}
              renderItem={({item, index}) => (
                <Chip
                  index={index}
                  title={item}
                  isSelected={index === selectedTagIndex}
                  onPress={() => onTagSelect(index)}
                />
              )}
              keyExtractor={item => item.toString()}
            />
          </Animated.View>
          <View style={styles.viewChanger}>
            <Animated.View style={[styles.activeViewIconBG, animatedStyle]} />
            <Pressable
              onPress={() => setActiveView(0)}
              style={[styles.viewIcon]}>
              <Icon
                name="view-grid"
                size={25}
                color={activeView === 0 ? COLOR.white : COLOR.primary}
              />
            </Pressable>
            <Pressable
              onPress={() => setActiveView(1)}
              style={[styles.viewIcon]}>
              <Icon
                name="format-list-bulleted-square"
                size={25}
                color={activeView === 1 ? COLOR.white : COLOR.primary}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterIcon: {
    backgroundColor: COLOR.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(5),
  },
  tagNViewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: COLOR.lightGray,
    position: 'absolute',
    top: 0,
    // zIndex: 1,
  },
  tagsWrapper: {
    paddingVertical: moderateScale(10),
    marginHorizontal: moderateScale(16),
  },
  viewChanger: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',

    right: 10,
    padding: moderateScale(1),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: COLOR.primary,
    backgroundColor: COLOR.white,
    overflow: 'hidden',
  },
  viewIcon: {
    padding: moderateScale(3),
    borderRadius: moderateScale(6),
    backgroundColor: COLOR.transparent,
  },

  activeViewIconBG: {
    position: 'absolute',
    backgroundColor: COLOR.primary,
    borderRadius: moderateScale(6),
    height: 31,
    width: 31,
  },
  list: {
    flex: 1,
    paddingBottom: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {width: '100%'},
  flatlistContent: {
    paddingHorizontal: moderateScale(16),
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
