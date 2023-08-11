import {View, StyleSheet, ScrollView, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {moderateScale, screenHeight} from '@app/utils/scaling_unit';
import {Product} from '@app/types/product';
import CoverImages from '@app/components/product-details/CoverImages';
import {Text} from 'react-native';
import COLOR from '@app/theme/COLOR';
import BottomSheet, {BottomSheetRef} from '@app/components/BottomSheet';
import StarRating from '@app/components/atoms/StarRating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {goBack} from '@app/navigation';

type ParamList = {
  Params: Product;
};

const ProductDetailsScreen = () => {
  const [isOnTop, setIsOnTop] = useState(false);
  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const sheetRef = React.useRef<BottomSheetRef>(null);

  useEffect(() => {
    sheetRef.current?.scrollTo(-screenHeight * 0.53);
  }, []);

  const updateShouldScroll = (position: number) => {
    if (position === 0) {
      setIsOnTop(false);
    }
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
      <CoverImages images={params.images} />
      <BottomSheet
        ref={sheetRef}
        onTopReached={value => {
          if (value !== isOnTop) {
            setIsOnTop(value);
          }
        }}
        maxTopPosition={-screenHeight * 0.8}
        maxBottomPosition={-screenHeight * 0.53}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isOnTop}
          scrollEventThrottle={32}
          onScroll={e => {
            updateShouldScroll(e.nativeEvent.contentOffset.y);
          }}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>{params.title}</Text>
            <StarRating rating={params.rating} />
            <Text>{params.description}</Text>
            {params.images && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {params.images.map((image, index) => (
                  <Pressable key={index} style={styles.thumbnail}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{uri: image}}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
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
    borderRadius: 10,
    borderColor: COLOR.primary,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
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

  title: {
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
});
