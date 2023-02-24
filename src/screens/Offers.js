import { HStack, Image, Input, ScrollView, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, Text, View, StyleSheet, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';
import Colors from '../constants/colors';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import { checkInternet } from '../helper/Utils';

export default function Offers({ navigation }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    const [loading, setLoding] = useState(false);
    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height
    const [getOffers, setOffers] = useState([]);

    const data = [
        {
            'id': 1,
            'title': 'Google pay',
            'name': 'we provide good offer for you',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 2,
            'title': 'Zomato',
            'name': 'Yeee. you have win zomato coupon ',
            'image': "https://picsum.photos/id/1/200/300",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 3,
            'title': 'flipkart',
            'name': 'Aida Bugg',
            'image': "https://picsum.photos/id/1/200/400",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 4,
            'title': 'Paytm',
            'name': 'Peg Legge',
            'image': "https://picsum.photos/200",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 5,
            'title': 'Oyo',
            'name': 'Liz Erd',
            'image': "https://picsum.photos/id/1/200/300",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 6,
            'title': 'Stive hospital',
            'name': 'A. Mused',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 7,
            'title': 'Stenliy hotel',
            'name': 'Ray O’Sun',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 8,
            'title': 'Test image',
            'name': 'Rita Book',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 9,
            'title': 'Test image',
            'name': 'Anne Teak',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 10,
            'title': 'Test image',
            'name': 'Anita Bath',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
    ]

    useEffect(() => {
        getOffersApi();
    }, []);

    const getOffersApi = async () => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                user_id: userDetail.user_id,
                token: userDetail.token
            };
            var response = await Helper.POST(Urls.offerList, apiData);
            if (response.error === '0') {
                setOffers(response.data)
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    };

    console.log(getOffers, 'getOffers---api data');

    return (
        <View style={{ backgroundColor: Colors.white, height: height, width: width, }}>
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
                        <Pressable onPress={() => navigation.navigate("Notification")}>
                            <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                                alt={"Alternate Text"}
                                source={require('../assets/Images/notification.png')} />
                        </Pressable>
                    </VStack>
                </HStack>
            </HStack>

            <View style={{ padding: 2 }}>
                <View style={{ backgroundColor: Colors.white, padding: 8 }}>
                    <Text numberOfLines={1} style={{ fontFamily: fonts.Poppins_Regular, fontSize: 20, color: Colors.black, marginBottom: 5 }}>Popular offers for you</Text>
                    <FlatList
                        data={getOffers}
                        ListEmptyComponent={<NoData />}
                        renderItem={({ item }) => {
                            return (
                                <VStack style={styles.stepCard}>
                                    <HStack >
                                        <Image style={{ height: 30, width: 30, marginLeft: 5 }} mr={'2'} ml={'2'} rounded={'full'}
                                            alt={"Alternate Text"} borderColor={Colors.grey} borderWidth={0.5}
                                            source={{ uri: item.image }} />
                                        <VStack style={{ width: '85%' }}>
                                            <Text numberOfLines={1} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 13, color: Colors.black, }}>{item.title}</Text>
                                            {/* <Text numberOfLines={1} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 14, color: Colors.black, }}>{item.name}</Text> */}
                                            <Text numberOfLines={2} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 11, color: Colors.black, }}>{item.description}</Text>

                                        </VStack>
                                    </HStack>
                                </VStack>
                            )
                        }} />
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

