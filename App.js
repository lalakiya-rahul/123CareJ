import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/colors';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './src/reducer/actions';

function App() {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000);


  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => getData())();
  }, []);

  const getData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    console.log(userData, 'user');
    if (JSON.parse(userData).user_id) {
      dispatch(login({ userDetail: JSON.parse(userData) }))
    }
  }
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
