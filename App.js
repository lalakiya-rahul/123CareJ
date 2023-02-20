import React, { useEffect } from 'react';
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
import PushNotification from "react-native-push-notification";

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000);
  });

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => getData())();
  }, []);

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {
        await AsyncStorage.setItem('token', token.token);
        console.log("TOKEN:", token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification here
        // // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: "1090501687137",
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  },);


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
