import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import { Avatar, Box, Checkbox, CheckCircleIcon, Divider, HStack, Image, Input, Select, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import PhoneInput from 'react-native-phone-number-input';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function PageView({ navigation, route }) {
    var data = route.params.page
    console.log(data, 'route----');
    return (
        <View style={{ backgroundColor: Colors.white, height: '100%' }}>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>
                        {route.params.page.title}
                    </Text>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >

                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </HStack>
                </HStack>
            </HStack>

        </View>
    )
}