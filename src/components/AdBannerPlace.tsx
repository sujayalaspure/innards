import {View, FlatList, StyleSheet, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';
import AdCard from '@app/components/AdCard';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';

const banners = [1, 2, 3];

type Props = {
  dotColor?: string;
};

const AdBannerPlace = ({dotColor = COLOR.primary}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = (i: number) => {
    console.log('scrollTo', i);
    setCurrentIndex(i);
    slideRef.current?.scrollToIndex({index: i});
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        ref={slideRef}
        data={banners}
        renderItem={_ => (
          <View style={styles.card}>
            <AdCard
              heading="20% OFF"
              subHeading="Make your first Purchase"
              actionText="GET NOW"
              promoCode="FIRST20"
            />
          </View>
        )}
        keyExtractor={item => item.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        scrollEventThrottle={32}
      />
      <View style={styles.dotWrapper}>
        {banners.map((_, i) => (
          <Pressable key={i} onPress={() => scrollTo(i)}>
            <View
              style={[
                styles.dot,
                i === currentIndex && styles.currentDot,
                {backgroundColor: dotColor},
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default AdBannerPlace;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 16,
    // backgroundColor: 'red',
  },
  flatlist: {
    flexGrow: 0,
  },
  card: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(10),
    // backgroundColor: 'yellow',
    // marginHorizontal: moderateScale(8),
  },
  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: moderateScale(8),
  },
  dot: {
    backgroundColor: COLOR.primary,
    opacity: 0.5,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  currentDot: {
    opacity: 1,
  },
});
