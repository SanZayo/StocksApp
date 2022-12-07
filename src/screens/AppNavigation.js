import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';

const AppNavigation = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  return (
    <View className="flex-row">
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Icon name="donute" color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default AppNavigation;
