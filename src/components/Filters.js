// @flow
import React from 'react';
import { useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { List, Button } from 'react-native-paper';

const FILTERS_ICON_WIDTH = 44;
const FILTERS_BUTTON_WIDTH = 100;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const Filters = props => {
  const [showFilter, setShowFilter] = useState(true);
  const { filters, activeFiltersMap, selectFilter } = props;
  const scrollViewPaddingLeft = FILTERS_BUTTON_WIDTH - 18;
  const animatedWidth = new Animated.Value(FILTERS_BUTTON_WIDTH);

  const scrollViewRef = React.useRef();

  const onFiltersScroll = event => {
    const eventX = event.nativeEvent.contentOffset.x;

    const direction = eventX > 0 ? 1 : -1;
    const offsetX = Math.min(
      Math.abs(eventX),
      FILTERS_BUTTON_WIDTH - FILTERS_ICON_WIDTH,
    );
    animatedWidth.setValue(FILTERS_BUTTON_WIDTH - offsetX * direction);
  };

  const onScrollEndSnapToEdge = event => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const maxOffset = FILTERS_BUTTON_WIDTH - FILTERS_ICON_WIDTH;
    const velocityFactor = Math.abs(event.nativeEvent.velocity.x * 30);

    if (offsetX > 0 && offsetX < maxOffset / 2 - velocityFactor) {
      scrollViewRef.scrollTo({ x: 0 });
    } else if (
      maxOffset / 2 + velocityFactor <= offsetX &&
      offsetX < maxOffset
    ) {
      scrollViewRef.scrollTo({
        x: FILTERS_BUTTON_WIDTH,
      });
    }
  };

  return (
    <View style={styles.container} className="mb-1">
      <View style={styles.stickyItem}>
        <Animated.View
          style={[
            styles.stickyItemMask,
            {
              width: animatedWidth,
              maxWidth: FILTERS_BUTTON_WIDTH,
            },
          ]}>
          {/* <StickyItemButton activeFiltersCount={activeFiltersCount} /> */}
          <Button
            className="m-2"
            mode="elevated"
            onPress={() => setShowFilter(!showFilter)}>
            Filters
          </Button>
        </Animated.View>
      </View>
      {showFilter && (
        <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingLeft: scrollViewPaddingLeft },
          ]}
          showsHorizontalScrollIndicator={false}
          onScroll={onFiltersScroll}
          onScrollEndDrag={onScrollEndSnapToEdge}
          scrollEventThrottle={16}
          ref={scrollViewRef}>
          {filters.map(filter =>
            filter.type === 'MULTI_CHOICE' ? (
              <List.Accordion
                className="border rounded-2xl text-zinc-50"
                title={filter.label}>
                {filter.options.map(opt => (
                  <List.Item
                    key={opt}
                    title={opt}
                    onPress={() => selectFilter(opt)}
                  />
                ))}
              </List.Accordion>
            ) : (
              <Button
                className="m-2"
                key={filter.name}
                mode={activeFiltersMap[filter.name] ? 'contained' : 'outlined'}
                onPress={() => selectFilter(filter.name)}>
                {filter.label}
              </Button>
            ),
          )}
        </ScrollView>
      )}
    </View>
  );
};

// const DropDownIcon = ({ active }) =>
//   active ? (
//     <IconSelectArrowDownBlue style={styles.dropDownIcon} />
//   ) : (
//     <IconSelectArrowDownWhite style={styles.dropDownIcon} />
//   );

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  stickyItem: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
    paddingRight: 8,
  },
  stickyItemMask: {
    minWidth: FILTERS_ICON_WIDTH,
    marginLeft: -8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  scrollView: {
    marginLeft: 10,
  },
  scrollViewContent: {
    paddingLeft: 100,
    paddingRight: 10,
    paddingBottom: 13,
    marginBottom: 5,
  },
  dropDownIcon: {
    marginRight: 6,
  },
});

export default Filters;
