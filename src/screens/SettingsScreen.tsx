import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';
import {getNavigator} from '@app/navigation';

const SettingsScreen = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>SettingsScreen</Text>
        <Button
          title="Screen1"
          onPress={() => {
            getNavigator().navigate('Screen1');
          }}
        />
        <Button
          title="Screen2"
          onPress={() => {
            getNavigator().navigate('Screen2');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;
