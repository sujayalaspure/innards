import {StyleSheet, View} from 'react-native';
import React from 'react';
import PriceChart from '@app/assets/svg/PriceChart';
import Slider from '@app/components/atoms/Slider';

type Props = {
  onRangeChnage: (min: number, max: number) => void;
  min: number;
  max: number;
  unit?: string;
};

const ChartNSlider = ({min = 0, max = 100, unit = '₹'}: Props) => {
  const handleRangeChange = (min: number, max: number) => {
    console.log(min, max);
  };
  return (
    <View style={styles.container}>
      <PriceChart />
      <Slider
        onRangeChnage={handleRangeChange}
        min={min}
        max={max}
        unit={unit}
      />
    </View>
  );
};

export default ChartNSlider;

const styles = StyleSheet.create({
  container: {},
});
