import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {screenNameTypes, setShowBottomBar} from '@app/navigation';
import {isShowBottomBar} from '@app/redux/reducers/userSlice';
import {useAppSelector} from '@app/redux/reduxHook';

const useBottomBar = (value: boolean, screenName?: screenNameTypes) => {
  const isFocus = useIsFocused();
  const isBottombarVisible = useAppSelector(isShowBottomBar);

  useEffect(() => {
    if (value === isBottombarVisible) {
      return;
    }
    if (isFocus) {
      setShowBottomBar(value, screenName);
    }
  }, [isFocus]);

  const toggleBottomBar = (value: boolean) => {
    setShowBottomBar(value, screenName);
  };

  return {toggleBottomBar};
};

export default useBottomBar;
