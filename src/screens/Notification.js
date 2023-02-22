import { Button, HStack, Image, Input, ScrollView, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, Text, View, StyleSheet, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Colors from '../constants/colors';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';

import { checkInternet, displayFromNow } from '../helper/Utils';
import moment from 'moment';

export default function Notification({ navigation }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    //serach screen
    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height
    const [isModalVisible, setModalVisible] = useState(false);
    const [NotiData, setNotiData] = useState(false);
    const [loading, setLoding] = useState(false);
    const [getNotificationData, setNotificationData] = useState([]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);

    };

    useEffect(() => {
        getNotification();
    }, []);

    const getNotification = async () => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                user_id: userDetail.user_id,
                token: userDetail.token
            };
            var response = await Helper.POST(Urls.notificationList, apiData);
            if (response.error === '0') {
                setNotificationData(response.data)
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    };

    return (
        <View style={{ backgroundColor: Colors.white, height: height, width: width, }}>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '6%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                </HStack>
                <HStack alignItems={'center'} >
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Notification</Text>

                </HStack>
                <HStack alignSelf={'center'} alignItems={'center'}>
                </HStack>
            </HStack>
            <Loader loading={loading} />
            <View style={{ padding: 2 }}>
                <View style={{ backgroundColor: Colors.white, padding: 8 }}>
                    <FlatList
                        data={getNotificationData}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <VStack style={styles.stepCard}>
                                    <Pressable onPress={() => { toggleModal(), setNotiData(item) }}>
                                        <HStack >
                                            <Image style={{ height: 35, width: 35, marginLeft: 5 }} mr={'2'} ml={'2'} rounded={'md'}
                                                alt={"Alternate Text"} borderColor={Colors.grey} borderWidth={0.5}
                                                source={{ uri: item.image }} />
                                            <VStack style={{ width: '85%' }}>
                                                <HStack justifyContent={'space-between'}>
                                                    <Text numberOfLines={2} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 14, color: Colors.black, }}>{item.title}</Text>
                                                    <Image style={{ height: 20, width: 20, transform: [{ rotate: '180deg' }], tintColor: Colors.chipColor }}
                                                        alt={"Alternate Text"}
                                                        source={require('../assets/Images/back.png')} />
                                                </HStack>
                                                <Text numberOfLines={2} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 11, color: Colors.black, }}>{item.description}</Text>
                                                <Text numberOfLines={1} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 10, color: Colors.grey, marginTop: '2%', alignSelf: 'flex-end' }}>{displayFromNow(item.date)}</Text>
                                            </VStack>
                                        </HStack>
                                    </Pressable>
                                </VStack>
                            )
                        }} />

                    <Modal
                        style={{ alignSelf: 'center', width: '85%', alignItems: 'center', }}
                        isVisible={isModalVisible}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{
                                backgroundColor: Colors.white, borderRadius: 8,
                                shadowColor: 'black',
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 6,
                                shadowOpacity: 0.26,
                                elevation: 8, width: '100%',
                                alignItems: 'center'
                            }}>
                                <VStack style={{ width: '85%' }}>
                                    <HStack justifyContent={'space-between'} mt={'3'}>
                                        <Text numberOfLines={2} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 18, color: Colors.black, }}>{NotiData.title}</Text>
                                        <Pressable onPress={() => toggleModal()}>
                                            <Image style={{ height: 25, width: 25, transform: [{ rotate: '135deg' }] }}
                                                alt={"Alternate Text"} borderColor={Colors.grey}
                                                source={require('../assets/Images/plus.png')} />
                                        </Pressable>
                                    </HStack>
                                    <Text style={{ fontFamily: fonts.Poppins_Medium, fontSize: 11, color: Colors.black, }}>{NotiData.description}</Text>
                                    <Text numberOfLines={1} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 10, color: Colors.grey, marginTop: '2%', alignSelf: 'flex-end', marginBottom: '2%' }}>{displayFromNow(NotiData.date)}</Text>
                                </VStack>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.secondaryPrimaryColor,
        borderRadius: 25,
        justifyContent: 'center',
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        position: 'relative',
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
    titleHeaderView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2
    },
    stepCard: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        alignContent: 'center',
        margin: 5,
        padding: 5,
        borderColor: Colors.secondaryPrimaryColor,
        borderWidth: 1
    }
});

