import {View, TextInput as Input, StyleSheet} from 'react-native';
import React from 'react';
import COLOR from '@app/theme/COLOR';
import SIZE from '@app/theme/SIZE';

type Props = {
  placeholder: string;
  secureTextEntry?: boolean;
};

const TextInput = ({placeholder, secureTextEntry}: Props) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholderTextColor={COLOR.gray}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
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
  },
  input: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLOR.black,
  },
});
