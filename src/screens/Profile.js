import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions, ToastAndroid } from 'react-native';

import Colors from '../constants/colors';
import { AlertDialog, Avatar, Button, Divider, HStack, Image, Input, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import CommonHeader from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkInternet } from '../helper/Utils';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import Loader from '../components/Loader';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Profile({ navigation }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [getSetPages, setGetPages] = React.useState([])
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [loading, setLoding] = React.useState(false);
    // const page = [
    //     {
    //         "id": 1,
    //         "title": "Disclaimer",
    //         "type": "cms",
    //         "status": 1,
    //         "created_at": "2021-09-05T17:44:46.000000Z",
    //         "updated_at": "2021-09-05T17:44:46.000000Z",
    //         "content": "<span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">123CARE - Life CARE Resources app - this is&nbsp; 100% FREE and single source of all kind of life / health care resources - the one and only of its type.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Register as a user in a single step with mobile number and then search the required help based on City / Category / keyword search and contact the resource provider from the app itself via a call or a message. If you are a resource provider , you can POST whatever help/ resources / products you want to provide or sell or rent.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Users can be individuals / NGOs / traders / suppliers / Govt bodies&nbsp; - just anyone with a valid mobile number.</span>",
    //         "slug": "terms-and-condition"
    //     },
    //     {
    //         "id": 2,
    //         "title": "About 123Care",
    //         "type": "cms",
    //         "status": 1,
    //         "created_at": "2021-09-05T17:44:46.000000Z",
    //         "updated_at": "2021-09-05T17:44:46.000000Z",
    //         "content": "<span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">123CARE - Life CARE Resources app - this is&nbsp; 100% FREE and single source of all kind of life / health care resources - the one and only of its type.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Register as a user in a single step with mobile number and then search the required help based on City / Category / keyword search and contact the resource provider from the app itself via a call or a message. If you are a resource provider , you can POST whatever help/ resources / products you want to provide or sell or rent.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Users can be individuals / NGOs / traders / suppliers / Govt bodies&nbsp; - just anyone with a valid mobile number.</span>",
    //         "slug": "terms-and-condition"
    //     },
    //     {
    //         "id": 3,
    //         "title": "FAQ",
    //         "type": "cms",
    //         "status": 1,
    //         "created_at": "2021-09-05T17:44:46.000000Z",
    //         "updated_at": "2021-09-05T17:44:46.000000Z",
    //         "content": "<span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">123CARE - Life CARE Resources app - this is&nbsp; 100% FREE and single source of all kind of life / health care resources - the one and only of its type.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Register as a user in a single step with mobile number and then search the required help based on City / Category / keyword search and contact the resource provider from the app itself via a call or a message. If you are a resource provider , you can POST whatever help/ resources / products you want to provide or sell or rent.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Users can be individuals / NGOs / traders / suppliers / Govt bodies&nbsp; - just anyone with a valid mobile number.</span>",
    //         "slug": "terms-and-condition"
    //     },
    //     {
    //         "id": 4,
    //         "title": "Anit-Scam",
    //         "type": "cms",
    //         "status": 1,
    //         "created_at": "2021-09-05T17:44:46.000000Z",
    //         "updated_at": "2021-09-05T17:44:46.000000Z",
    //         "content": "<span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">123CARE - Life CARE Resources app - this is&nbsp; 100% FREE and single source of all kind of life / health care resources - the one and only of its type.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Register as a user in a single step with mobile number and then search the required help based on City / Category / keyword search and contact the resource provider from the app itself via a call or a message. If you are a resource provider , you can POST whatever help/ resources / products you want to provide or sell or rent.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Users can be individuals / NGOs / traders / suppliers / Govt bodies&nbsp; - just anyone with a valid mobile number.</span>",
    //         "slug": "terms-and-condition"
    //     },
    //     {
    //         "id": 5,
    //         "title": "Trems & Conditions",
    //         "type": "cms",
    //         "status": 1,
    //         "created_at": "2021-09-05T17:44:46.000000Z",
    //         "updated_at": "2021-09-05T17:44:46.000000Z",
    //         "content": "<span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">123CARE - Life CARE Resources app - this is&nbsp; 100% FREE and single source of all kind of life / health care resources - the one and only of its type.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Register as a user in a single step with mobile number and then search the required help based on City / Category / keyword search and contact the resource provider from the app itself via a call or a message. If you are a resource provider , you can POST whatever help/ resources / products you want to provide or sell or rent.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Users can be individuals / NGOs / traders / suppliers / Govt bodies&nbsp; - just anyone with a valid mobile number.</span>",
    //         "slug": "terms-and-condition"
    //     },
    //     {
    //         "id": 6,
    //         "title": "Privacy",
    //         "type": "cms",
    //         "status": 1,
    //         "created_at": "2021-09-05T17:44:46.000000Z",
    //         "updated_at": "2021-09-05T17:44:46.000000Z",
    //         "content": "<span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">123CARE - Life CARE Resources app - this is&nbsp; 100% FREE and single source of all kind of life / health care resources - the one and only of its type.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Register as a user in a single step with mobile number and then search the required help based on City / Category / keyword search and contact the resource provider from the app itself via a call or a message. If you are a resource provider , you can POST whatever help/ resources / products you want to provide or sell or rent.</span><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><br style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\"><span style=\"font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: medium;\">Users can be individuals / NGOs / traders / suppliers / Govt bodies&nbsp; - just anyone with a valid mobile number.</span>",
    //         "slug": "terms-and-condition"
    //     },
    // ]

    React.useEffect(() => {
        getPages();
    }, []);

    const getPages = async () => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                lang_id: 1
            }
            var response = await Helper.POST(Urls.pages, apiData);
            if (response.error === '0') {
                setGetPages(response.data)
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    const logout = async () => {
        setLoding(true);
        await AsyncStorage.setItem("userData", "");
        await AsyncStorage.clear();
        setLoding(false);
        navigation.replace("Login");
        onClose
    }
    return (
        <View>
            <Loader loading={loading} />
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '6%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.navigate('MyProfile')}>
                        <Image style={{ height: 35, width: 35 }}
                            alt={"Alternate Text"}
                            rounded={'full'}
                            source={{ uri: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg' }} />
                    </Pressable>
                </HStack>
                <HStack alignItems={'center'} >
                    <Pressable >
                        <Image style={{ height: 34, width: 110 }}
                            alt={"Alternate Text"}
                            source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} />
                    </Pressable>
                </HStack>
                <HStack alignSelf={'center'} alignItems={'center'}>
                    <VStack >
                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </VStack>
                </HStack>
            </HStack>
            <ScrollView style={{ height: height, width: width, backgroundColor: Colors.white, }}>
                <View style={{}}>
                    <View style={{ width: '100%', padding: 5, marginTop: '1%' }}>
                        <Pressable onPress={() => navigation.navigate('MyProfile')}>
                            <HStack justifyContent={'space-between'} alignItems={'center'} mt={'1'}>
                                <HStack alignItems={'center'} p={'3'}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center', tintColor: Colors.primaryColor, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/user1.png')} />
                                    <Text style={styles.menuText}>My Profile</Text>
                                </HStack>

                                <Image style={styles.BackIconStyle}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/back.png')} />
                            </HStack>
                        </Pressable>
                        <Divider mt={'0.5'} />
                        <Pressable onPress={() => navigation.navigate('Message')}>
                            <HStack justifyContent={'space-between'} alignItems={'center'} mt={'2'}>
                                <HStack alignItems={'center'} p={'3'}>
                                    <Image style={{ width: 25, height: 22, alignSelf: 'center', tintColor: Colors.primaryColor, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/email.png')} />
                                    <Text style={styles.menuText}>Chats</Text>
                                </HStack>
                                <Image style={styles.BackIconStyle}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/back.png')} />
                            </HStack>
                        </Pressable>

                        <Divider mt={'0.5'} />
                        <Pressable onPress={() => navigation.navigate('MyAds')}>
                            <HStack justifyContent={'space-between'} alignItems={'center'} mt={'2'}>
                                <HStack alignItems={'center'} p={'3'}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center', tintColor: Colors.primaryColor, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/doubleSquare.png')} />
                                    <Text style={styles.menuText}>My ads</Text>
                                </HStack>
                                <Image style={styles.BackIconStyle}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/back.png')} />
                            </HStack>
                        </Pressable>
                        <Divider mt={'0.5'} />
                        <Pressable onPress={() => navigation.navigate('Fevorites')}>
                            <HStack justifyContent={'space-between'} alignItems={'center'} mt={'2'}>
                                <HStack alignItems={'center'} p={'3'}>
                                    <Image style={{ width: 25, height: 22, alignSelf: 'center', tintColor: Colors.primaryColor, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/hart1.png')} />
                                    <Text style={styles.menuText}>Fevorites</Text>

                                </HStack>
                                <Image style={styles.BackIconStyle}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/back.png')} />
                            </HStack>
                        </Pressable>

                        <Divider mt={'0.5'} />
                        <FlatList
                            data={getSetPages}
                            // contentContainerStyle={{ alignSelf: 'center', }}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable onPress={() => navigation.navigate('PageView', { page: item.content, title: item.title })}>
                                        <HStack justifyContent={'space-between'} alignItems={'center'} mt={'2'}>
                                            <HStack alignItems={'center'} p={'3'}>
                                                <Image style={{ width: 25, height: 22, alignSelf: 'center', tintColor: Colors.primaryColor, transform: [{ rotate: '180deg' }] }}
                                                    alt={"Alternate Text"}
                                                    source={require('../assets/Images/arrow_back.png')} />
                                                <Text style={styles.menuText}>{item.title}</Text>
                                            </HStack>
                                            <Image style={styles.BackIconStyle}
                                                alt={"Alternate Text"}
                                                source={require('../assets/Images/back.png')} />
                                        </HStack>
                                        <Divider mt={'0.5'} />
                                    </Pressable>
                                )
                            }
                            }
                            keyExtractor={(item) => item.id.toString()} />
                        <Pressable onPress={() => setIsOpen(!isOpen)}>
                            <HStack justifyContent={'space-between'} alignItems={'center'} mt={'2'}>
                                <HStack alignItems={'center'} p={'3'}>
                                    <Image style={{ width: 25, height: 24, alignSelf: 'center', tintColor: Colors.primaryColor, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/logout.png')} />
                                    <Text style={styles.menuText}>Logout </Text>
                                </HStack>
                            </HStack>
                        </Pressable>
                        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                            <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>Logout</AlertDialog.Header>
                                <AlertDialog.Body>
                                    You are sure you want to logout?
                                </AlertDialog.Body>
                                <AlertDialog.Footer justifyContent={'center'}>
                                    <Button.Group space={2} >
                                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme={'darkBlue'} onPress={() => logout()}>
                                            Logout
                                        </Button>
                                    </Button.Group>
                                </AlertDialog.Footer>
                            </AlertDialog.Content>
                        </AlertDialog>
                        <Divider mt={'0.5'} />
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    menuText: {
        fontFamily: fonts.Poppins_SemiBold,
        fontSize: 14,
        color: Colors.black,
        marginLeft: 18
    },
    BackIconStyle: {
        height: 20,
        width: 20,
        transform: [{ rotate: '180deg' }]
    }
});
