import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Divider } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    navigation.navigate('Welcome');
  };
  return (
    <SafeAreaView>
      <Button
        style={{ padding: 2 }}
        title="English"
        onPress={() => changeLanguage('en')}
      />
      <Divider />
      <View className="mt-1" />
      <Button
        style={{ padding: 2 }}
        title="Hindi"
        onPress={() => changeLanguage('hi')}
      />
    </SafeAreaView>
  );
};

export default ChangeLanguage;
