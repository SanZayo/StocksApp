import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { stockHeaders } from '../constants/stockConstat';

const StockView = ({ navigation }) => {
  const stocks = useSelector(state => state.stock.stocks);
  //console.log(stocks);
  const viewDetails = stock => {
    //alert('Details');
    navigation.navigate('Details', { data: stock });
  };
  return (
    <View>
      <DataTable>
        <DataTable.Header className="bg-slate-400">
          {stockHeaders.map(title => (
            <DataTable.Title key={title}>
              <Text className="text-white font-bold">{title}</Text>
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {stocks &&
          stocks.map(stock => (
            <TouchableOpacity onPress={() => viewDetails(stock)}>
              <DataTable.Row className="font-bold" key={stock.sid}>
                <DataTable.Cell>{stock.sid}</DataTable.Cell>
                <DataTable.Cell>{stock.type}</DataTable.Cell>
                <DataTable.Cell>{stock.exchange}</DataTable.Cell>
                <DataTable.Cell>{stock.price}</DataTable.Cell>
                <DataTable.Cell>{stock.change}</DataTable.Cell>
                <DataTable.Cell>{stock.dyChange}</DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          ))}
      </DataTable>
    </View>
  );
};

export default StockView;
