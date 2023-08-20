import {
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {image2, image3, image4} from '@app/assets/images';
import CircularButton from '@app/components/atoms/CircularButton';
import {moderateScale} from '@app/utils/scaling_unit';
import {getNavigator} from '@app/navigation';
import {StackActions} from '@react-navigation/native';
import COLOR from '@app/theme/COLOR';

const {width, height} = Dimensions.get('window');

const OnBoardingData = [
  {
    title: 'There is a magic growing with plants.',
    image: image4,
  },
  {
    title: 'Happiness is turning your space into a garden.',
    image: image3,
  },
  {
    title: 'Happiness is growing your own food.',
    image: image2,
  },
];
const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef<FlatList>(null);

  const scrollNext = () => {
    if (currentIndex < OnBoardingData.length - 1) {
      slideRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      getNavigator()?.dispatch(StackActions.replace('AuthOverviewScreen'));
    }
  };

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View>
      <FlatList
        ref={slideRef}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={OnBoardingData}
        renderItem={({item}) => (
          <View style={{width, height}}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
      />
      <View style={styles.nextButton}>
        <CircularButton
          iconName="chevron-right"
          onPress={() => {
            scrollNext();
          }}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {},
  image: {width, flex: 1},
  title: {
    position: 'absolute',
    top: height * 0.7,
    alignSelf: 'center',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLOR.black,
    textAlign: 'center',
  },
  nextButton: {
    position: 'absolute',
    bottom: height * 0.1,
    alignSelf: 'center',
  },
});
