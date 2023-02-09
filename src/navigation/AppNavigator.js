
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import OTP from '../screens/OTP';
import Signup from '../screens/Signup';
import BottomTab from '../navigation/BottomTab';
import Product from '../screens/Product';
import Message from '../screens/Message';
import ProductDetails from '../screens/ProductDetails';
import MyProfile from '../screens/MyProfile';
import MyAds from '../screens/MyAds';
import Archived from '../screens/Archived';
import PageView from '../screens/PageView';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="OTP" component={OTP} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="Product" component={Product} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
                <Stack.Screen name="MyAds" component={MyAds} />
                <Stack.Screen name="Archived" component={Archived} />
                <Stack.Screen name="PageView" component={PageView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;



