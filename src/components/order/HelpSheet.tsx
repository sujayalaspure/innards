import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import Button from '@app/components/atoms/Button';
import Separator from '@app/components/atoms/Separator';
import COLOR from '@app/theme/COLOR';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const helpItems = [
  {
    id: '1',
    title: 'Item damaged',
  },
  {
    id: '2',
    title: 'Item missing',
  },
  {
    id: '3',
    title: 'Item not as described',
  },
  {
    id: '4',
    title: 'Item not delivered',
  },
];

const HelpSheet = () => {
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.optionWrapper}>
        {helpItems.map(item => (
          <Pressable
            style={styles.optionItem}
            onPress={() => setSelectedOption(prev => (prev === item.id ? '' : item.id))}>
            <View style={styles.icon}>
              {selectedOption === item.id && <Icon name="check" size={20} color={COLOR.accent} />}
            </View>
            <Text style={styles.optionText}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.buttonWrapper}>
        <Button iconName="phone" title="Talk to Us" />
        <Separator width={20} />
        <Button style={styles.messageButton} iconName="chat-processing" title="Message Us" />
      </View>
    </View>
  );
};

export default HelpSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  optionWrapper: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomColor: COLOR.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: COLOR.black,
    fontWeight: '300',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    // backgroundColor: COLOR.lightGray,
    marginRight: 10,
  },

  buttonWrapper: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  messageButton: {
    backgroundColor: COLOR.blue,
    borderColor: COLOR.blue,
  },
});
