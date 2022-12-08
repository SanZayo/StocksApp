import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const navigateToStockDetails = () => {
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>navigation.StockDetails');
    navigation.navigate('StockDetails');
  };
  const navigateToAddEdit = () => {
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>> navigate AddEdit");
    navigation.navigate('AddEdit', { editMode: 'new' });
  };
  return (
    <View>
      <View className="flex text-center m-3">
        <Text className="text-center text-fuchsia-700 font-extrabold p-4 text-xl border border-cyan-600 rounded-full">
          {t('home.title')}
        </Text>
      </View>
      <View className="flex text-center m-3 h-auto">
        <Image
          className="rounded-2xl"
          style={{ height: 300, width: 'auto' }}
          source={{
            uri: 'https://img.freepik.com/free-vector/stock-market-illustration-with-bull-bear_1017-9635.jpg?w=740&t=st=1669623901~exp=1669624501~hmac=c2bf1d134e23be7a33fcf81160ac31c969fa00f3444815a6f6a62c00699235d3',
          }}
        />
      </View>
      <View className="flex columns-1 mt-3 pb-2">
        <TouchableOpacity>
          <Button
            className="mb-1 m-3"
            mode="contained"
            containerStyle={styles.buttonContainer}
            onPress={() => navigateToStockDetails()}>
            {t('home.viewstocks')}
          </Button>
          <Button
            mode="contained"
            className="m-2"
            containerStyle={styles.buttonContainer}
            onPress={() => navigateToAddEdit()}>
            {t('home.addstocks')}
          </Button>
          {/* <Banner
          className="bottom-0 mt-14"
            visible={true}
          >
            Developed and Designed by MB & Pvt Ltd
          </Banner> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 5,
  },
});
