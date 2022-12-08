import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Icon } from '@rneui/themed';

const DetailsScreen = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <Card>
      <Card.Title>{data.sid}</Card.Title>
      <Card.Divider />

      {/* <Title className="text-blue-700 text-center mb-2">{data.sid}</Title> */}
      {/* <View className="border border-neutral-300 p-0 m-0"></View> */}
      <View className="flex-row text-center mt-2 mb-2">
        <Text className="text-orange-500 mr-2" variant="titleMedium">
          Type:
        </Text>
        <Text variant="titleSmall">{data.type}</Text>
      </View>
      <View className="flex-row text-center mb-2">
        <Text className="text-orange-500 mr-2" variant="titleMedium">
          Exchange:
        </Text>
        <Text variant="titleSmall">{data.exchange}</Text>
      </View>
      <View className="flex-row text-center mb-2">
        <Text className="text-orange-500 mr-2" variant="titleMedium">
          Price:{' '}
        </Text>
        <Text variant="titleSmall">{data.price}</Text>
      </View>
      <View className="flex-row text-center mb-2">
        <Text className="text-orange-500 mr-2" variant="titleMedium">
          Change:{' '}
        </Text>
        <Text variant="titleSmall">{data.change}</Text>
      </View>
      <View className="flex-row text-center mb-2">
        <Text className="text-orange-500 mr-2" variant="titleMedium">
          Day change:{' '}
        </Text>
        <Text variant="titleSmall">{data.dyChange}</Text>
      </View>
      {/* <View className="border border-neutral-300 p-0 m-3"></View> */}

      <Card.Divider />
      <View className="flex-row justify-between mt-2">
        <Button
          type="solid"
          className="text-center"
          color="#8A2BE2"
          onPress={() => navigation.goBack()}
          title="Show List">
          <Icon name="list" color="white" />
          Show Stocks
        </Button>
        <Button
          type="solid"
          className="text-center rounded-full"
          onPress={() =>
            navigation.navigate('AddEdit', { editMode: 'edit', data: data })
          }
          title="Edit">
          <Icon name="edit" color="white" />
          Edit
        </Button>
      </View>
    </Card>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
