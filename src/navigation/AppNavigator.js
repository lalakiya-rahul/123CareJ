
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import OTP from '../screens/OTP';
import Signup from '../screens/Signup';
import BottomTab from '../navigation/BottomTab';
import Product from '../screens/Product';
import Message from '../screens/Message';
import ProductDetails from '../screens/ProductDetails';
import HospitalDetails from '../screens/HospitalDetails';
import MyProfile from '../screens/MyProfile';
import MyAds from '../screens/MyAds';
import Fevorites from '../screens/Fevorites';
import PageView from '../screens/PageView';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const AppNavigator = () => {

    // const initState = {
    //     token: ''
    // }
    // const [state, setState] = React.useState(initState);

    // useEffect(async () => {
    //     const userData = await AsyncStorage.getItem('userData');
    //     setState({
    //         token: JSON.parse(userData).token
    //     })
    //     return () => {
    //         console.log("This will be logged on unmount");
    //     }
    // }, []);
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName={"Login"}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="OTP" component={OTP} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="Product" component={Product} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
                <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
                <Stack.Screen name="MyAds" component={MyAds} />
                <Stack.Screen name="Fevorites" component={Fevorites} />
                <Stack.Screen name="PageView" component={PageView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigator;



