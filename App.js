import React, { Suspense } from 'react';
import type { Node } from 'react';
import './i18n';

import { ThemeProvider, createTheme, Text, Icon } from '@rneui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import store from './src/redux/store';
import { Provider as StoreProvider } from 'react-redux';

import ChangeLanguage from './src/screens/ChangeLanguage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';

const theme = createTheme({
  lightColors: {
    primary: '#aabbcc',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});

//const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App: () => Node = () => {

  return (
    <ThemeProvider>
      <StoreProvider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Drawer.Navigator screenOptions={{
                overlayColor: 'transparent'
              }} >
                <Drawer.Screen name="Main" component={HomeScreen} options={{ drawerLabel: 'Home', title: 'Stock', drawerIcon: () => <Icon name="home" size={20} color='black' /> }} />
                <Drawer.Screen name="Language" component={ChangeLanguage} options={{ drawerIcon: () => <Icon name="language" size={20} color='black' /> }} />
              </Drawer.Navigator>
              {/* <Suspense fallback={<Text>loading...</Text>}>
             <Localization />
           </Suspense> */}
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </StoreProvider>
    </ThemeProvider >
  );
};

export default App;
