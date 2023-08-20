import {
  View,
  TextInput as Input,
  StyleSheet,
  Pressable,
  TextInputProps,
} from 'react-native';
import React, {useState} from 'react';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {debounce} from 'lodash';

interface Props extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const TextInput = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  ...props
}: Props) => {
  const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);
  const handleChangeText = debounce((text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  }, 500);

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholderTextColor={COLOR.gray}
        placeholder={placeholder}
        secureTextEntry={isSecureEntry}
        onChangeText={handleChangeText}
        {...props}
      />
      {secureTextEntry && (
        <Pressable onPress={() => setIsSecureEntry(prev => !prev)}>
          <Icon
            name={isSecureEntry ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={COLOR.gray}
          />
        </Pressable>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.lightGray,
    height: 50,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: COLOR.gray,
    borderRadius: SIZE.radius,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLOR.black,
    padding: 8,
  },
});
