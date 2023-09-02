import {View, FlatList, StyleSheet} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Animated from 'react-native-reanimated';

import {Image} from 'react-native';
import {moderateScale, screenHeight, screenWidth} from '@app/utils/scaling_unit';
import {productimages} from '@app/assets/images';
import COLOR from '@app/theme/COLOR';

type Props = {
  images?: string[];
  onScroll?: (y: number) => void;
};

export type CoverImagesRef = {
  scrollTo: (y: number) => void;
  currentIndex: number;
};

const CoverImages = forwardRef<CoverImagesRef, Props>(({images, onScroll}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef<FlatList>(null);

  const data = images || productimages;

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
    if (onScroll) {
      onScroll(viewableItems[0].index);
    }
  }).current;

  const scrollTo = (index: number) => {
    slideRef.current?.scrollToIndex({index});
  };

  useImperativeHandle(ref, () => ({scrollTo, currentIndex}), [scrollTo, currentIndex]);

  return (
    <View>
      <Animated.View>
        <FlatList
          ref={slideRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          data={data}
          renderItem={({item}) => <Image source={{uri: item}} style={styles.coverImage} resizeMode="cover" />}
          keyExtractor={item => item}
        />
      </Animated.View>
      <View style={styles.dotWrapper}>
        {data.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex && styles.currentDot]} />
        ))}
      </View>
    </View>
  );
});

export default CoverImages;

const styles = StyleSheet.create({
  coverImage: {
    width: screenWidth,
    height: screenHeight * 0.55,
  },
  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: moderateScale(8),
    position: 'absolute',
    top: screenHeight * 0.45,
    alignSelf: 'center',
  },
  dot: {
    backgroundColor: COLOR.gray,
    opacity: 0.5,
    height: 6,
    width: 6,
    borderRadius: 5,
  },
  currentDot: {
    opacity: 1,
    // backgroundColor: COLOR.accent,
  },
});
