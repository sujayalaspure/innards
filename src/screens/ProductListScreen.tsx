import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import Animated, {SlideInRight, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';

import {HeaderBar, Chip} from '@app/components/atoms';
import COLOR from '@app/theme/COLOR';
import {moderateScale} from '@app/utils/scaling_unit';
import {SpacerH20, SpacerH70, SpacerW6, SpacerW70} from '@app/components/atoms/Separator';
import {useAppSelector} from '@app/redux/reduxHook';
import {useProductSelector} from '@app/redux/reducers/productSlice';
import {ProductCardVerticle, ProductCardHorizontal} from '@app/components';
import {navigateToScreen} from '@app/navigation';
import {Product} from '@app/types/product';
import useBottomBar from '@app/hooks/useBottomBar';
type Props = {title: string; category: string};

type ParamList = {Params: Props};

type activeViewType = 'horizontal' | 'vertical';

const categoryTags = ['All', 'Seeds', 'Equipments', 'Plant Food', 'Seasonal'];

const ProductListScreen = () => {
  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);
  const tagsListRef = useRef<FlatList>(null);
  const [activeView, setActiveView] = useState<activeViewType>('vertical');

  const {products} = useAppSelector(useProductSelector);
  useBottomBar(true);

  const onTagSelect = (index: number) => {
    setSelectedTagIndex(index);
    tagsListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(activeView === 'vertical' ? 1 : 31, {
          damping: 14,
          stiffness: 90,
        }),
      },
    ],
  }));

  const renderItems = ({item, index}: {item: Product; index: number}) => {
    if (activeView === 'vertical') {
      return <ProductCardVerticle key={index} product={item} index={index} />;
    } else {
      return <ProductCardHorizontal inView="listScreen" key={index} product={item} index={index} />;
    }
  };

  const RenderProduct = useCallback(() => {
    const flatlistProps = {
      ListHeaderComponent: SpacerH70,
      data: products,
      showsVerticalScrollIndicator: false,
      horizontal: false,
      renderItem: renderItems,
      ListFooterComponent: SpacerH70,
    };

    if (activeView === 'vertical') {
      return <FlatList {...flatlistProps} numColumns={2} />;
    } else {
      return (
        <FlatList
          {...flatlistProps}
          contentContainerStyle={styles.flatlistContent}
          style={styles.flatlist}
          ItemSeparatorComponent={SpacerH20}
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
          <Animated.View entering={SlideInRight.delay(100).springify().damping(14)} style={styles.tagsWrapper}>
            <FlatList
              ref={tagsListRef}
              data={categoryTags}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={SpacerW6}
              ListFooterComponent={SpacerW70}
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
            <Pressable onPress={() => setActiveView('vertical')} style={[styles.viewIcon]}>
              <Icon name="view-grid" size={25} color={activeView === 'vertical' ? COLOR.white : COLOR.primary} />
            </Pressable>
            <Pressable onPress={() => setActiveView('horizontal')} style={[styles.viewIcon]}>
              <Icon
                name="format-list-bulleted-square"
                size={25}
                color={activeView === 'horizontal' ? COLOR.white : COLOR.primary}
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
    position: 'absolute',
    top: 0,
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
    // overflow: 'hidden',
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
