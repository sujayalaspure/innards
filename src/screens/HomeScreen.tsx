import {Button, SafeAreaView, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-svg';
import {navigateToScreen} from '@app/navigation';

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <SafeAreaView>
        <Text>HomeScreen</Text>
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

export default HomeScreen;
