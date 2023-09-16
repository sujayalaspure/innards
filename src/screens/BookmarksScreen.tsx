import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useBookmarkSelector} from '@app/redux/reducers/bookmarkSlice';
import {useAppSelector} from '@app/redux/reduxHook';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {FlatList} from 'react-native';
import Separator from '@app/components/atoms/Separator';
import {moderateScale} from '@app/utils/scaling_unit';
import ProductCardHorizontal from '@app/components/ProductCardHorizontal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import useBottomBar from '@app/hooks/useBottomBar';
import {translate} from '@app/i18n/translate';

const Spacer = () => <Separator height={10} />;
const FooterSpacer = () => <Separator height={80} />;

const BookmarksScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const {bookmarks} = useAppSelector(useBookmarkSelector);
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

  const onSearch = (text: string) => {
    const filtered = bookmarks.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredBookmarks(filtered);
  };

  useBottomBar(true, 'BookmarksScreen');

  return (
    <>
      <HeaderBar
        title={translate('bookmarks')}
        showSearch={showSearch}
        onSearchEnd={() => {
          setFilteredBookmarks(bookmarks);
          setShowSearch(false);
        }}
        RightSideElement={<Icon name="magnify" size={30} color={COLOR.white} />}
        onRightElementPressed={() => setShowSearch(true)}
        onSearch={onSearch}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatlistContent}
          style={styles.flatlist}
          ListHeaderComponent={Spacer}
          ListFooterComponent={FooterSpacer}
          ItemSeparatorComponent={Spacer}
          data={filteredBookmarks}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          renderItem={({item, index}) => <ProductCardHorizontal inView="listScreen" key={index} product={item} />}
        />
      </View>
    </>
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
