import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Product from '../screens/Product';
import ProductDetails from '../screens/ProductDetails';
import HospitalDetails from '../screens/HospitalDetails';
import AboutUs from '../screens/AboutUs';
import AddListing from '../screens/AddListing'
import Search from '../screens/Search';
import Offers from '../screens/Offers';
import Message from '../screens/Message';
import Profile from '../screens/Profile';
import MyProfile from '../screens/MyProfile';
import MyAds from '../screens/MyAds';
import Fevorites from '../screens/Fevorites';
import PageView from '../screens/PageView';
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

const HomeNavigationStack = createNativeStackNavigator();

function HomeStack() {
    return (
        <HomeNavigationStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeNavigationStack.Screen name="Home" component={Home} />
            <HomeNavigationStack.Screen name="Product" component={Product} />
            <HomeNavigationStack.Screen name="ProductDetails" component={ProductDetails} />
            <HomeNavigationStack.Screen name="HospitalDetails" component={HospitalDetails} />
            <HomeNavigationStack.Screen name="MyProfile" component={MyProfile} />
        </HomeNavigationStack.Navigator>
    );
}

function OfferStack() {
    return (
        <HomeNavigationStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeNavigationStack.Screen name="Offers" component={Offers} />
            <HomeNavigationStack.Screen name="MyProfile" component={MyProfile} />
        </HomeNavigationStack.Navigator>
    );
}

function SearchStack() {
    return (
        <HomeNavigationStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeNavigationStack.Screen name="Search" component={Search} />
            <HomeNavigationStack.Screen name="Product" component={Product} />
            <HomeNavigationStack.Screen name="ProductDetails" component={ProductDetails} />
            <HomeNavigationStack.Screen name="MyProfile" component={MyProfile} />
        </HomeNavigationStack.Navigator>
    );
}


function MoreStack() {
    return (
        <HomeNavigationStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeNavigationStack.Screen name="Profile" component={Profile} />
            <HomeNavigationStack.Screen name="MyProfile" component={MyProfile} />
            <HomeNavigationStack.Screen name="MyAds" component={MyAds} />
            <HomeNavigationStack.Screen name="Fevorites" component={Fevorites} />
            <HomeNavigationStack.Screen name="PageView" component={PageView} />
            <HomeNavigationStack.Screen name="Message" component={Message} />
        </HomeNavigationStack.Navigator>
    );
}


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
                name="Home"
                component={HomeStack}
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
                name="Offers"
                component={OfferStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignContent: 'center', }}>
                            <Image
                                source={require('../assets/Images/offer.png')}
                                resizeMode={'contain'}
                                style={{ width: 28, height: 28, tintColor: focused ? Colors.white : Colors.grey2, alignSelf: 'center' }}
                            />
                            <Text style={{ color: focused ? Colors.white : Colors.grey2, fontSize: 12, }}
                            >Offers</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="AddListing"
                component={SearchStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', padding: 5, alignSelf: 'center', backgroundColor: '#fff', width: 67, height: 65, borderRadius: 35, }}>
                            {/* <Image resizeMode='contain' source={require('../assets/Images/Add.png')}
                                style={{
                                    width: 57, height: 60, borderRadius: 30,
                                }}
                            /> */}

                            <Image
                                style={{ height: 58, width: 60, resizeMode: 'stretch', alignSelf: 'center', marginTop: '-2%', }}
                                source={require('../assets/Images/mainSearch.png')} alt="Alternate Text" />

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
                component={MoreStack}
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

