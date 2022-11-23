import { View, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Filters from './Filters';
import { FILTERS } from '../constants/stockConstat';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Search = ({ searchData, filterData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFiltersMap, setActiveFiltersMap] = useState({});
  const stocks = useSelector(state => state.stock.stocks);

  const selectFilter = name => {
    //alert(JSON.stringify(activeFiltersMap));
    setActiveFiltersMap(prevActive => ({ ...prevActive, [name]: name }));
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
    <View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon className="top-4" color="gray" size={20} />
          <TextInput
            className="p-0"
            placeholder="Search by Name"
            keyboardType="default"
            value={searchQuery}
            onChangeText={text => onChangeSearch(text)}
          />
        </View>
        {/* <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        /> */}
        {/* <Button className="sw-[20%] m-1" mode="outlined" onPress={searchStock}>
          Search
        </Button> */}
      </View>
      <Filters
        filters={FILTERS}
        activeFiltersCount={0}
        activeFiltersMap={activeFiltersMap}
        selectFilter={selectFilter}
      />
    </View>
  );
};

export default Search;
