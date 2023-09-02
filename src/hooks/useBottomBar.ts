import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {setShowBottomBar} from '@app/navigation';

const useBottomBar = (value: boolean) => {
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      setShowBottomBar(value);
    }
  }, [isFocus]);

  const toggleBottomBar = (value: boolean) => {
    setShowBottomBar(value);
  };

  return {toggleBottomBar};
};

export default useBottomBar;
