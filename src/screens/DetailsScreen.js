import React from 'react';
import { View } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';

const DetailsScreen = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <Card>
      <Card.Title>{data.sid}</Card.Title>
      <Card.Content>
        <Title className="text-blue-700 text-center mb-2">{data.sid}</Title>
        <View className="border border-neutral-300 p-0 m-0" />
        <View className="flex-row text-center mt-2">
          <Text className="text-orange-500 mr-2" variant="titleMedium">
            Type:
          </Text>
          <Text variant="titleSmall">{data.type}</Text>
        </View>
        <View className="flex-row text-center">
          <Text className="text-orange-500 mr-2" variant="titleMedium">
            Exchange:
          </Text>
          <Text variant="titleSmall">{data.exchange}</Text>
        </View>
        <View className="flex-row text-center">
          <Text className="text-orange-500 mr-2" variant="titleMedium">
            Price:{' '}
          </Text>
          <Text variant="titleSmall">{data.price}</Text>
        </View>
        <View className="flex-row text-center">
          <Text className="text-orange-500 mr-2" variant="titleMedium">
            Change:{' '}
          </Text>
          <Text variant="titleSmall">{data.change}</Text>
        </View>
        <View className="flex-row text-center">
          <Text className="text-orange-500 mr-2" variant="titleMedium">
            Day change:{' '}
          </Text>
          <Text variant="titleSmall">{data.dyChange}</Text>
        </View>
        <View className="border border-neutral-300 p-0 m-3" />
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          className="text-center"
          onPress={() => navigation.goBack()}>
          Show List
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default DetailsScreen;
