import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import Colors from '../constants/colors';
// import Images from '../Theme/Images';
// import Style, { HEIGHT } from '../Theme/Style';
import { LocalData } from './Urls';
import { validationempty } from './Validations';
import NetInfo from '@react-native-community/netinfo';

var Id, Name, Token;

export const checkInternet = async () => {
    NetInfo.fetch().then((state) => {
        console.log("====", state.isConnected + "")
        if (state.isConnected) {
            return true;
        }
        else {
            return false;
        }
    });
}


export const showToast = (msg, type) => {
    if (msg) {
        Toast.show({
            text1: msg,
            type: type, //'success | error | info',
            position: 'top',
            visibilityTime: 6000,
            autoHide: true,
            topOffset: 10,
            // bottomOffset: 40,
        });
    }
};
export const CheckLogin = async () => {
    var user_id = await AsyncStorage.getItem('user_id');
    var access_token = await AsyncStorage.getItem('access_token');

    if (validationempty(user_id)) {
        LocalData.user_id = user_id;
        LocalData.access_token = access_token;

        return true;
    } else {
        return false;
    }
};

export const logout = async (navigation) => {
    await AsyncStorage.setItem('user_id', '');
    await AsyncStorage.setItem('access_token', '');
    await AsyncStorage.setItem('fcmToken', '');
    await AsyncStorage.clear();
    navigation.popToTop();
    navigation.replace('Login');
};

export const Indicator = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'stretch',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                zIndex: 50,
            }}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
    );
};

export const Indicator1 = () => {
    return <ActivityIndicator size="small" color={Colors.primaryColor} />;
};

export const NoData = (props) => {
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                // height: HEIGHT / 2,
            }}>
            <Image
                // source={Images.nodata}
                style={{ width: '100%', height: 150 }}
                resizeMode="contain"
            />
            <Text style={[Style.text12, { width: '100%', textAlign: 'center' }]}>
                {validationempty(props.itemtext) ? props.itemtext : 'No Data Available'}
            </Text>
        </View>
    );
};

// export function LocalData(id, token, name) {
//      Id = id
//      Token = token
//      Name = name

// }
// export {Id,Token,Name}
