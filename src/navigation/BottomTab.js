import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Product from '../screens/Product';
import ProductDetails from '../screens/ProductDetails';
import AboutUs from '../screens/AboutUs';
import AddListing from '../screens/AddListing'
import Message from '../screens/Message';
import Profile from '../screens/Profile';
import MyProfile from '../screens/MyProfile';
import MyAds from '../screens/MyAds';
import Archived from '../screens/Archived';
import Colors from '../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <Pressable
        style={{ top: '-5%', justifyContent: 'center', alignItems: 'center', }}
        onPress={onPress}>
        <View style={{ width: 70, height: 70, }}>
            {children}
        </View>
    </Pressable>
);




const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                style: {
                    position: 'absolute',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    backgroundColor: Colors.primaryColor,
                    height: '7%',
                }
            }}>
            <Tab.Screen
                name="HomeStack"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItem: 'center', justifyContant: 'center', }}>
                            <Image
                                source={require('../assets/Images/home1.png')}
                                resizeMode={'contain'}
                                style={{ width: 30, height: 30, tintColor: focused ? Colors.white : Colors.grey2, alignSelf: 'center' }}
                            />
                            <Text style={{ color: focused ? Colors.white : Colors.grey2, fontSize: 12 }}
                            >Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Message"
                component={AboutUs}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignContent: 'center', }}>
                            <Image
                                source={require('../assets/Images/hearto.png')}
                                resizeMode={'contain'}
                                style={{ width: 30, height: 30, tintColor: focused ? Colors.white : Colors.grey2, alignSelf: 'center' }}
                            />
                            <Text style={{ color: focused ? Colors.white : Colors.grey2, fontSize: 12, }}
                            >Favorites</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="AddListing"
                component={Message}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', padding: 5, alignSelf: 'center', backgroundColor: '#fff', width: 67, height: 70, borderRadius: 35, }}>
                            {/* <Image resizeMode='contain' source={require('../assets/Images/Add.png')}
                                style={{
                                    width: 57, height: 60, borderRadius: 30,
                                }}
                            /> */}
                            <View style={{ height: 60, width: 60, borderRadius: 65 / 1, backgroundColor: Colors.skyBlue, alignSelf: 'center', }}>
                                <Image
                                    style={{ height: 35, width: 35, resizeMode: 'stretch', alignSelf: 'center', marginTop: '15%', tintColor: Colors.white, }}
                                    source={require('../assets/Images/search.png')} alt="Alternate Text" />
                            </View>
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name="Serach"
                component={AddListing}
                options={{

                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItem: 'center', justifyContant: 'center', }}>
                            <Image
                                source={require('../assets/Images/note-plus.png')}
                                resizeMode={'contain'}
                                style={{ width: 30, height: 30, tintColor: focused ? Colors.white : Colors.grey2, alignSelf: 'center' }}
                            />
                            <Text style={{ color: focused ? Colors.white : Colors.grey2, fontSize: 12 }}
                            >Post Ads</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItem: 'center', justifyContant: 'center', }}>
                            <Image
                                source={require('../assets/Images/menu.png')}
                                resizeMode={'contain'}
                                style={{ width: 30, height: 30, tintColor: focused ? Colors.white : Colors.grey2, alignSelf: 'center' }}
                            />
                            <Text style={{ color: focused ? Colors.white : Colors.grey2, fontSize: 12 }}
                            > More </Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: Colors.white,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;

