import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import COLOR from '@app/theme/COLOR';

const UPIView = () => {
  const [upiID, setupiID] = useState('');
  const [errorMsg, setError] = useState('');
  const handleChange = (text: string) => {
    setupiID(text);
    if (!text) {
      return setError('');
    }
    let regex = new RegExp(/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/);
    if (regex.test(text)) {
      setError('');
    } else {
      setError('Invalid UPI ID');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={upiID}
        onChangeText={handleChange}
        autoComplete="email"
        style={styles.input}
        placeholder="Enter UPI ID"
      />
      <Text style={[styles.captionText, !!errorMsg && styles.errorMsg]}>
        {errorMsg || 'Your UPI ID will be encrypted and is 100% safe with us'}
      </Text>
    </View>
  );
};

export default UPIView;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginVertical: 10,
  },
  input: {
    borderRadius: 6,
    borderWidth: 0.8,
    borderColor: COLOR.gray,
    fontSize: 16,
    fontWeight: '500',
    color: COLOR.black,
    padding: 10,
    marginBottom: 4,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLOR.gray,
  },
  errorMsg: {
    color: COLOR.accent,
  },
});
