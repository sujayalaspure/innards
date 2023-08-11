import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  TextInputProps,
} from 'react-native';
import React, {useRef} from 'react';
import COLOR from '@app/theme/COLOR';
import {moderateScale} from '@app/utils/scaling_unit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends TextInputProps {
  onSearch?: (t: string) => void;
  showMic?: boolean;
  onMicPress?: () => void;
  onClear?: () => void;
  isFocused?: boolean;
}

const SearchBar = ({
  onSearch,
  showMic,
  onMicPress,
  onFocus,
  isFocused,
  ...props
}: Props) => {
  const inputRef = useRef<TextInput>(null);
  const onInputFocus = (e: any) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  const onMicPressHandler = () => {
    inputRef.current?.blur();
    if (onMicPress) {
      onMicPress();
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="magnify" size={25} color={COLOR.gray} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search"
        onChangeText={onSearch}
        onFocus={onInputFocus}
        {...props}
      />
      {showMic && (
        <Pressable onPress={onMicPressHandler} style={styles.micIcon}>
          <Icon
            name={isFocused ? 'close' : 'microphone'}
            size={20}
            color={COLOR.gray}
          />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: moderateScale(16),
    padding: moderateScale(10),
    flex: 1,
  },
  micIcon: {
    aspectRatio: 1 / 1,
    borderRadius: moderateScale(20),
    backgroundColor: COLOR.lightGray,
    padding: moderateScale(5),
  },
});
