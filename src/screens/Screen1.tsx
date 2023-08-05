import {View, Text, Button, SafeAreaView} from 'react-native';
import React from 'react';
import {navigateToScreen} from '@app/navigation';

const Screen1 = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>Screen1</Text>
        <Text>Hello</Text>
        <Button
          title="Screen1"
          onPress={() => {
            navigateToScreen('Screen1');
          }}
        />
        <Button
          title="Screen2"
          onPress={() => {
            navigateToScreen('Screen2');
          }}
        />
        <Button
          title="SettingsScreen"
          onPress={() => {
            navigateToScreen('SettingsScreen');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Screen1;
