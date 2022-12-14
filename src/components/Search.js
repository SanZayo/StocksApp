import { View, Text, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Filters from './Filters';
import { FILTERS } from '../constants/stockConstat';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@rneui/themed';

const Search = ({ searchData, filterData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFiltersMap, setActiveFiltersMap] = useState({});
  const stocks = useSelector(state => state.stock.stocks);

  const selectFilter = name => {
    //alert(JSON.stringify(activeFiltersMap));
    if (activeFiltersMap[name]) {
      setActiveFiltersMap(
        prevActive => {
          return { ...prevActive, [name]: undefined };
        },
        () => {
          filterData(activeFiltersMap, stocks);
        },
      );
    } else {
      setActiveFiltersMap(prevActive => ({ ...prevActive, [name]: name }));
    }
  };
  const onChangeSearch = text => {
    setSearchQuery(text);
    searchData(text, stocks);
  };

  useEffect(() => {
    filterData(activeFiltersMap, stocks);
  }, [activeFiltersMap]);

  // useEffect(() => {
  //   setActiveFiltersMap({});
  // }, [stocks]);
  return (
    <View className="flex-row">
      <View className="flex-row items-center p-1 m-1 border rounded-3xl bg-white w-4/5 inline-block">
        {/* <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-md"> */}
        <MagnifyingGlassIcon
          className="absolute top-1 left-1 p-2"
          color="gray"
          size={20}
        />
        <TextInput
          className="p-1 rounded-3xl"
          placeholder="Search by Name"
          keyboardType="default"
          value={searchQuery}
          onChangeText={text => onChangeSearch(text)}
        />

        {/* </View> */}
        {/* <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        /> */}
        {/* <Button className="sw-[20%] m-1" mode="outlined" onPress={searchStock}>
          Search
        </Button> */}
      </View>
        <View className="w-1/5 p-1 m-0 -ml-2">
          <Button 
          style={{marginHorizontal: 3}} 
          title={'Filters'} 
          type="outline"
          onPress={console.log('open filter')}
          ></Button>
        </View>
      {/* <Filters
        filters={FILTERS}
        activeFiltersCount={0}
        activeFiltersMap={activeFiltersMap}
        selectFilter={selectFilter}
      /> */}
    </View>
  );
};

export default Search;
