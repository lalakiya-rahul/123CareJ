import React, { useRef, useState } from 'react';
import { View, Pressable, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import { HStack, Image, Text, } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import { WebView } from 'react-native-webview';

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
            {
                route.params.page.content ?
                    <WebView source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + route.params.page.content + '</body></html>' }} />
                    :
                    null
            }

        </View>
    )
}