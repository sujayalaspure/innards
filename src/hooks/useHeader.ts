import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '@app/redux/reduxHook';
import {toggleHeaderVisible} from '@app/redux/reducers/settingsSlice';

const useHeader = (value?: boolean) => {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('up');
  const dispatch = useAppDispatch();

  let previousScrollOffset = 40;
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollOffset = event.nativeEvent.contentOffset.y;

    const isGoingDown = currentScrollOffset > previousScrollOffset;

    setScrollDirection(isGoingDown ? 'down' : 'up');

    if (currentScrollOffset > previousScrollOffset + 100) {
      previousScrollOffset = event.nativeEvent.contentOffset.y;
    }
    if (currentScrollOffset === 0) {
      previousScrollOffset = 0;
    }
  };

  const hideHeader = () => {
    dispatch(toggleHeaderVisible(false));
  };
  const showHeader = () => {
    dispatch(toggleHeaderVisible(true));
  };

  useEffect(() => {
    dispatch(toggleHeaderVisible(scrollDirection === 'up'));
  }, [scrollDirection]);

  return {
    onScroll,
    value,
    scrollDirection,
    hideHeader,
    showHeader,
  };
};

export default useHeader;
