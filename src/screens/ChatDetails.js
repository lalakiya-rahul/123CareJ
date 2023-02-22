import React, { useCallback, useEffect, useState } from 'react';
import { Divider, HStack, Image, Input, ScrollView, VStack, KeyboardAvoidingView } from 'native-base';
import { Dimensions, FlatList, Pressable, Text, View, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatDetails({ navigation, route }) {
    //serach screen

    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    return (
        <View style={{ backgroundColor: Colors.white, height: height, width: width, }}>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '6%', }} >
                <HStack>
                    <HStack alignItems={'center'} >
                        <Pressable onPress={() => navigation.goBack()}>
                            <Image style={{ height: 30, width: 30 }}
                                alt={"Alternate Text"}
                                source={require('../assets/Images/arrow_back.png')} />
                        </Pressable>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 14 }]}>{route.params.title}</Text>
                    </HStack>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <VStack >
                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </VStack>
                </HStack>
            </HStack>

            <KeyboardAvoidingView
                flex={2}
                enabled={Platform.OS === 'android'}
                behavior="padding"
            >

                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    keyboardShouldPersistTaps='never'
                />
                <View style={{ marginBottom: '8%' }} />
            </KeyboardAvoidingView>

        </View>
    )
}