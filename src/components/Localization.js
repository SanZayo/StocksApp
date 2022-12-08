import { View, Text } from 'react-native';
import React from 'react';
import * as RNLocalize from 'react-native-localize';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, FAB } from '@rneui/themed';

const Localization = () => {
  const { t, i18n } = useTranslation();
  //console.log(RNLocalize.getLocales());
  //console.log(RNLocalize.getCurrencies());
  //console.log("TimeZone===============> ", RNLocalize.getTimeZone());
  //console.log("Currencies===============> ", RNLocalize.getCurrencies());
  RNLocalize.addEventListener('change', () => {
    // do localization related stuff…
  });
  const navigation = useNavigation();
  return (
    <View className="flex flex-row-reverse justify-between mt-1 ml-1 mr-1">
      <Text className="text-center text-sm text-violet-800 mr-2 mt-1 ">
        {t('home.country')} {RNLocalize.getCountry()}
      </Text>
      {/* <Button
        style={{borderRadius: '50%'}}
        onPress={() => navigation.navigate('Language')}>
          <Icon name="language" color="white" />
          {t('home.changelanguage')}
      </Button> */}
      <FAB
        visible
        title={t('home.changelanguage')}
        upperCase
        color="green"
        icon={{ name: 'language', color: 'white' }}
      />
    </View>
  );
};

export default Localization;
