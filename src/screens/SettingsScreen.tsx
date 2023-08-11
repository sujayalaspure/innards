import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';
import {getNavigator} from '@app/navigation';
import HeaderBar from '@app/components/atoms/HeaderBar';

const SettingsScreen = () => {
  return (
    <View>
      <HeaderBar showBackButton title="SettingsScreen" />

      <SafeAreaView>
        <Text>SettingsScreen</Text>
        <Button
          title="HomeScreen"
          onPress={() => {
            getNavigator().navigate('HomeScreen');
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
