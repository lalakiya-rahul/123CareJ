import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/colors';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function App() {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 3000);
  });
  return (
    <>
      <NavigationContainer>
        <NativeBaseProvider>
          <StatusBar
            animated={true}
            barStyle="dark-content"
            backgroundColor={Colors.white}
          />
          <SafeAreaView style={{ backgroundColor: Colors.primaryColor, }} />
          <AppNavigator />
        </NativeBaseProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
