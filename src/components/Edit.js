import { View } from 'react-native';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Text,
  CheckBox,
  ListItem,
  Icon,
} from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { addNewStock, updateStockAction } from '../redux/features/stockSlice';
import { useNavigation } from '@react-navigation/native';

const Edit = ({ route }) => {
  const navigation = useNavigation();
  const { editMode, data: stockData } = route.params;
  //console.log(stockData, editMode);
  const listStockTypes = [
    { id: 1, title: 'Index', name: 'index' },
    { id: 2, title: 'Stock', name: 'stock' },
  ];
  const dispatch = useDispatch();
  const [stock, setStock] = useState(
    stockData || {
      sid: '',
      exchange: '',
      price: '',
      type: '',
    },
  );

  const [expanded, setExpanded] = useState(false);
  const updateStock = (prop, value) => {
    if (prop === 'price' && value) {
      value = value.replace(/[^0-9]/g, '');
    }
    setStock(prevStock => {
      return { ...prevStock, [prop]: value };
    });
    if (value === 'stock' || value === 'index') {
      setExpanded(!expanded);
    }
  };

  const submitData = () => {
    if (editMode === 'new') {
      dispatch(addNewStock(stock));
    } else {
      dispatch(updateStockAction(stock));
    }
    navigation.navigate('StockDetails');
  };
  return (
    <Card>
      <Card.Title>
        <Text className="text-center text-fuchsia-400 m-3 text-xl font-bold">
          {editMode === 'new' ? 'Add Stock' : 'Edit Stock'}
        </Text>
      </Card.Title>
      <Card.Divider />

      <Input
        className="p-2 mb-1"
        label="Name"
        name="name"
        value={stock.sid}
        onChangeText={text => updateStock('sid', text)}
      />
      {/* <TextInput
          className="p-2 mb-1"
          label="Type"
          name="type"
          value={stock.type}
          onChangeText={text => updateStock('type', text)}
        /> */}
      {/* <List.Section title="Type">
        <List.Accordion
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          title={stock.type || 'select stock'}>
          <List.Item
            title="Stock"
            onPress={() => updateStock('type', 'stock')}
          />
          <List.Item
            title="Index"
            onPress={() => updateStock('type', 'index')}
          />
        </List.Accordion>
      </List.Section> */}
      <View>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>{stock.type || 'select stock'}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          {listStockTypes.map((l, i) => (
            <ListItem
              key={l.id}
              onPress={() => updateStock('type', l.name)}
              bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>
      </View>
      <View className="flex flex-row text-center m-2">
        <View className="flex-row p-2">
          <CheckBox
            center
            title="NSE"
            checkedIcon={stock.exchange === 'NSE' ? 'dot-circle-o' : 'circle-o'}
            checked={stock.exchange === 'NSE' ? 'checked' : 'unchecked'}
            onPress={() => updateStock('exchange', 'NSE')}
          />
          {/* <Text variant="titleMedium" className="absolute left-10 top-3">
            NSE
          </Text> */}
        </View>
        <View className="flex-row p-2 ml-6">
          <CheckBox
            center
            title="BSE"
            checkedIcon={stock.exchange === 'BSE' ? 'dot-circle-o' : 'circle-o'}
            checked={stock.exchange === 'BSE' ? 'checked' : 'unchecked'}
            onPress={() => updateStock('exchange', 'BSE')}
          />
          {/* <Text variant="titleMedium" className="absolute left-10 top-3">
            Index
          </Text> */}
        </View>
      </View>
      <Card.Divider />
      <Input
        className="p-2 mb-1"
        label="Price"
        name="price"
        value={+stock.price}
        onChangeText={text => updateStock('price', text)}
      />
      <View className="flex-row justify-between">
        <Button
          onPress={() => submitData()}
          title={editMode === 'new' ? 'ADD' : 'UPDATE'}
          type="Solid"
          color="secondary"
        />
        <Button
          onPress={() => navigation.navigate('Welcome')}
          title="Home"
          type="Solid"
          color="secondary"
        />
      </View>
    </Card>
  );
};

export default Edit;
