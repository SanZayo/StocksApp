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
import { Button, Icon, ListItem } from '@rneui/themed';

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
      scrollViewRef?.scrollTo({ x: 0 });
    } else if (
      maxOffset / 2 + velocityFactor <= offsetX &&
      offsetX < maxOffset
    ) {
      scrollViewRef?.scrollTo &&
        scrollViewRef?.scrollTo({
          x: FILTERS_BUTTON_WIDTH,
        });
    }
  };

  return (
    <View style={styles.container}>
      <View>
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
            type="solid"
            onPress={() => setShowFilter(!showFilter)}>
            <Icon name="filter-alt" color="white" />
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
          {filters.map((filter, index) =>
            filter.type === 'MULTI_CHOICE' ? null : (
              // <ListItem
              //   key={index}
              //   className="border rounded-2xl text-zinc-50"
              //   title={filter.label}>
              //   <ListItem.Content>
              //     {filter.options.map((opt,i) => (
              //       <ListItem.Title key={opt} onPress={e => selectFilter(opt)}>{opt}</ListItem.Title>
              //     ))}
              //   </ListItem.Content>
              // </ListItem>
              <Button
                containerStyle={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 1,
                }}
                buttonStyle={{
                  borderRadius: 3,
                }}
                key={filter.name}
                title={filter.label}
                type={activeFiltersMap[filter.name] ? 'solid' : 'outline'}
                onPress={() => selectFilter(filter.name)}
              />
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
  },
  stickyItemMask: {
    minWidth: FILTERS_ICON_WIDTH,
    marginLeft: -8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  scrollView: {
    marginLeft: 0,
  },
  scrollViewContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 1,
    marginBottom: 2,
  },
  dropDownIcon: {
    marginRight: 6,
  },
});

export default Filters;
