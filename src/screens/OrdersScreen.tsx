import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import HeaderBar from '@app/components/atoms/HeaderBar';
import {useAppDispatch, useAppSelector} from '@app/redux/reduxHook';
import {clearOrders, useOrderSelector} from '@app/redux/reducers/orderSlice';
import OrderCard from '@app/components/order/OrderCard';
import {SpacerH70} from '@app/components/atoms/Separator';
import {navigateToScreen} from '@app/navigation';
import {Order} from '@app/types/order';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '@app/theme/COLOR';
import {translate} from '@app/i18n/translate';
import useBottomBar from '@app/hooks/useBottomBar';

const OrdersScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const {orders} = useAppSelector(useOrderSelector);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const dispatch = useAppDispatch();

  useBottomBar(false, 'OrdersScreen');

  const onPressHandler = (order: Order) => {
    navigateToScreen('OrderSummaryScreen', order);
  };

  const onSearch = (text: string) => {
    if (text.toLowerCase() === 'clear') {
      dispatch(clearOrders());
      setFilteredOrders([]);
      return;
    }
    const filtered = orders.filter(item =>
      item.products.some(product => product.title.toLowerCase().includes(text.toLowerCase())),
    );
    setFilteredOrders(filtered);
  };
  return (
    <>
      <HeaderBar
        autoFocusSearch
        searchPlaceholder={translate('search_by_product')}
        showBackButton
        title={translate('my_orders')}
        showSearch={showSearch}
        onSearchEnd={() => {
          setFilteredOrders(orders);
          setShowSearch(false);
        }}
        RightSideElement={<Icon name="magnify" size={30} color={COLOR.white} />}
        onRightElementPressed={() => setShowSearch(true)}
        onSearch={onSearch}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <Button title="clear" onPress={() => dispatch(clearOrders())} /> */}
        <View style={styles.content}>
          {filteredOrders.map(order => (
            <OrderCard key={order.id} {...order} onPress={() => onPressHandler(order)} />
          ))}
          <SpacerH70 />
        </View>
      </ScrollView>
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // flex: 1,
  },
});
