import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';
import {Chip, HeaderBar, Separator} from '@app/components/atoms';
import ChartNSlider from '@app/components/molecules/ChartNSlider';
import useBottomBar from '@app/hooks/useBottomBar';
import {translate} from '@app/i18n/translate';

const categoryTags = ['Live Plants', 'Pots & Planters', 'Seeds', 'Fertiilers & Soils', 'Equipments'];

const envTag = ['Indoor', 'Outdoor', 'Indoor & Outdoor'];

const plantType = [
  'Flower Plants',
  'Fruit Plants',
  'Herbs',
  'Vegetable Plant',
  'Bulbs',
  'Bonsai',
  'Bamboo Plant',
  'Aquatic Plants',
];

const FilterScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    category: 0,
    priceRange: 0,
    environment: 0,
    livePlants: 0,
  });

  useBottomBar(false);

  return (
    <>
      <HeaderBar showBackButton title={'Filter'} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{translate('category')}</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.tagListWrapper}>
            {categoryTags.map((tag, index) => (
              <Chip
                key={index}
                title={tag}
                isSelected={index === selectedFilter.category}
                onPress={() => {
                  setSelectedFilter({
                    ...selectedFilter,
                    category: index,
                  });
                }}
              />
            ))}
          </View>

          {/*  */}
          <Separator height={20} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{translate('price_range')}</Text>
            <View style={styles.line} />
          </View>
          <ChartNSlider />

          {/*  */}
          <Separator height={20} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{translate('environment')}</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.tagListWrapper}>
            {envTag.map((tag, index) => (
              <Chip
                key={index}
                title={tag}
                isSelected={index === selectedFilter.environment}
                onPress={() => {
                  setSelectedFilter({
                    ...selectedFilter,
                    environment: index,
                  });
                }}
              />
            ))}
          </View>

          {/*  */}
          <Separator height={20} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{translate('live_plants')}</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.tagListWrapper}>
            {plantType.map((tag, index) => (
              <Chip
                key={index}
                title={tag}
                isSelected={index === selectedFilter.livePlants}
                onPress={() => {
                  setSelectedFilter({
                    ...selectedFilter,
                    livePlants: index,
                  });
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLOR.white,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  sectionHeaderText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginRight: moderateScale(10),
    color: COLOR.black,
    opacity: 0.8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLOR.gray,
    opacity: 0.5,
  },
  tagListWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
