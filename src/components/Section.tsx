import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import React from 'react';
import {moderateScale} from '@app/utils/scaling_unit';
import COLOR from '@app/theme/COLOR';

type Props = {
  id?: string | number;
  title?: string;
  onActionPress?: (id?: string | number) => void;
  actionText?: string;
  children?: React.ReactNode;
  scrollEnabled?: boolean;
  numColumns?: number;
};

const Section = ({
  id,
  title,
  onActionPress,
  actionText,
  children,
  scrollEnabled = false,
  numColumns = 2,
}: Props) => {
  const flatlistProps = {
    ...(scrollEnabled && {horizontal: true}),
    scrollEnabled,
    ...(!scrollEnabled && {
      numColumns,
    }),
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>{title}</Text>
        {actionText && (
          <Pressable onPress={() => onActionPress && onActionPress(id)}>
            <Text style={styles.actionText}>{actionText}</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.childrenWrapper}>
        {Array.isArray(children) ? (
          <FlatList
            {...flatlistProps}
            showsHorizontalScrollIndicator={false}
            data={children}
            renderItem={({item}) => <>{item}</>}
            keyExtractor={(_, index) => index.toString()}
            // ItemSeparatorComponent={() => <Separator width={10} height={10} />}
          />
        ) : (
          children
        )}
      </View>
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
  },
  headingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
  },
  heading: {
    fontSize: moderateScale(22),
    fontWeight: '500',
  },
  actionText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLOR.primaryDark,
  },
  childrenWrapper: {
    alignItems: 'center',
  },
});
