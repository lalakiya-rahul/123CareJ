import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import Colors from '../constants/colors';
import fonts from '../constants/fonts';

export default function NoData({ navigation, route }) {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: 'center', marginTop: '30%' }}>
            <Image source={require('../assets/Images/noData.png')} style={{ height: 350, width: 350, }} />
            <Text numberOfLines={2} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 14, color: Colors.black, }}>No Data Found</Text>
        </View>
    )
}