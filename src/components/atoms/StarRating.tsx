import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from '@app/utils/scaling_unit';
import {formatCount} from '@app/utils/commonFunctions';
import {Rating} from '@app/types/product';

type Props = {
  rating?: Rating | number;
};

const StarRating = ({rating}: Props) => {
  let rate = 0;
  let count = 0;
  if (typeof rating === 'number') {
    rate = rating;
  } else if (typeof rating === 'object') {
    rate = parseFloat(rating.rate.toString());
    count = parseInt(rating.count?.toString() || '0', 10);
  }

  const score = Math.round(rate / 0.5) * 0.5;
  // Get the number of whole stars
  const iWholeStars = Math.floor(score);
  // Do we want a half star?
  const blnHalfStar = iWholeStars < score;
  // Get the number of empty stars
  const iEmptyStars = 5 - iWholeStars - (blnHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {Array(iWholeStars)
        .fill(0)
        .map((item, i) => (
          <Icon key={i} name="star" size={moderateScale(15)} color={COLOR.yellow} />
        ))}
      {blnHalfStar && <Icon name="star-half-full" size={moderateScale(15)} color={COLOR.yellow} />}
      {Array(iEmptyStars)
        .fill(0)
        .map((item, i) => (
          <Icon key={i} name="star-outline" size={moderateScale(15)} color={COLOR.yellow} />
        ))}
      {count !== 0 && (
        <Text ellipsizeMode="tail" style={styles.text}>
          {formatCount(count)} Ratings
        </Text>
      )}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    overflow: 'hidden',
  },
  text: {
    color: COLOR.gray,
    fontSize: moderateScale(10),
  },
});
