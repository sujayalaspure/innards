import {View, Text, Button, SafeAreaView} from 'react-native';
import React from 'react';
import {navigateToScreen} from '@app/navigation';

const Screen2 = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>Screen2</Text>
        <Text>Hello</Text>
        <Button
          title="HomeScreen"
          onPress={() => {
            navigateToScreen('HomeScreen');
          }}
        />
        <Button
          title="Screen2"
          onPress={() => {
            navigateToScreen('Screen2');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Screen2;
