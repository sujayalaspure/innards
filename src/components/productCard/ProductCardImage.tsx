import {View, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, screenWidth} from '@app/utils/scaling_unit';
import {useProductCardContext} from '@app/components/productCard/ProductCardContext';

const ProductCardImage = () => {
  const {product} = useProductCardContext();
  const [thumbImage, setThumbImage] = useState(product.thumbnail);

  return (
    <View style={styles.thumbnail}>
      <Image
        resizeMode="cover"
        style={styles.image}
        onError={() => {
          setThumbImage('https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg');
        }}
        source={{uri: thumbImage}}
      />
    </View>
  );
};

export default ProductCardImage;

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  image: {
    height: screenWidth / 2 - 32,
    width: screenWidth / 2 - 32,

    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    aspectRatio: 1 / 1,
  },
});
