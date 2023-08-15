import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useBookmarkSelector} from '@app/redux/reducers/bookmarkSlice';
import {useAppSelector} from '@app/redux/reduxHook';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {FlatList} from 'react-native';
import Separator from '@app/components/atoms/Separator';
import {moderateScale} from '@app/utils/scaling_unit';
import ProductCardHorizontal from '@app/components/ProductCardHorizontal';

const Spacer = () => <Separator height={10} />;
const FooterSpacer = () => <Separator height={80} />;

const BookmarksScreen = () => {
  const {bookmarks} = useAppSelector(useBookmarkSelector);
  console.log('bookmarks', bookmarks.length);

  return (
    <>
      <HeaderBar title="Bookmarks" />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatlistContent}
          style={styles.flatlist}
          ListHeaderComponent={Spacer}
          ListFooterComponent={FooterSpacer}
          ItemSeparatorComponent={Spacer}
          data={bookmarks}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          renderItem={({item, index}) => (
            <ProductCardHorizontal
              inView="listScreen"
              key={index}
              product={item}
            />
          )}
        />
      </View>
    </>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
