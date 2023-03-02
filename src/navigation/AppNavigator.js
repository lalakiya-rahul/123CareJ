
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
import CategoryDetails from '../screens/CategoryDetails';
import MyProfile from '../screens/MyProfile';
import MyAds from '../screens/MyAds';
import Fevorites from '../screens/Fevorites';
import PageView from '../screens/PageView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducer/actions';
import Notification from '../screens/Notification';
import ChatDetails from '../screens/ChatDetails';
import Category from '../screens/Category';
import { Linking } from 'react-native';


const LoginStack = createNativeStackNavigator()
function LoginStackNavigation() {


    const linking = {
        prefixes: ['123care://', 'https://care123.page.link'],
        config: {
            initialRouteName: 'BottomTab',
            screens: {
                ProductDetails: {
                    path: 'ProductDetails/:product_id?',
                    parse: {
                        product_id: (product_id) => `${product_id}`,
                    },
                }
            }
        }
    };
    return (
        <NavigationContainer independent={true} linking={linking}>
            <LoginStack.Navigator
                initialRouteName='Login'
                screenOptions={{ headerShown: false }}>
                <LoginStack.Screen name="Login" component={Login} />
                <LoginStack.Screen name="OTP" component={OTP} />
                <LoginStack.Screen name="Signup" component={Signup} />
                <BottomStack.Screen name="BottomTab" component={BottomTab} />
                <BottomStack.Screen name="ChatDetails" component={ChatDetails} />
            </LoginStack.Navigator>
        </NavigationContainer>
    )
}



const BottomStack = createNativeStackNavigator()
function BottomStackNavigation() {
    const linking = {
        prefixes: ['123care://', 'https://care123.page.link'],
    };
    return (
        <NavigationContainer independent={true} linking={linking}>
            <BottomStack.Navigator
                initialRouteName='BottomTab'
                screenOptions={{ headerShown: false }}>
                <LoginStack.Screen name="Login" component={Login} />
                <BottomStack.Screen name="BottomTab" component={BottomTab} />
                <BottomStack.Screen name="Product" component={Product} />
                <BottomStack.Screen name="Category" component={Category} />
                <BottomStack.Screen name="ProductDetails" component={ProductDetails} />
                <BottomStack.Screen name="CategoryDetails" component={CategoryDetails} />
                <BottomStack.Screen name="Notification" component={Notification} />
                <BottomStack.Screen name="Message" component={Message} />
                <BottomStack.Screen name="ChatDetails" component={ChatDetails} />
                <BottomStack.Screen name="MyProfile" component={MyProfile} />
                <BottomStack.Screen name="MyAds" component={MyAds} />
                <BottomStack.Screen name="Fevorites" component={Fevorites} />
                <BottomStack.Screen name="PageView" component={PageView} />
            </BottomStack.Navigator>
        </NavigationContainer>
    )
}


const AppNavigator = () => {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    // console.log(userDetail, 'user detilesss---123');





    return (
        <NavigationContainer independent={true}>
            {userDetail.token ? <BottomStackNavigation /> : <LoginStackNavigation />}
        </NavigationContainer>
    )
}

export default AppNavigator;



