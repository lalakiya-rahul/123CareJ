import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Dimensions, ToastAndroid, } from 'react-native';

import Colors from '../constants/colors';
import { HStack, Image, Text, VStack, FlatList, Input, Divider, Stack, Box, Select, CheckCircleIcon } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import Share from 'react-native-share';
import { map } from 'lodash'
import { SliderBox } from "react-native-image-slider-box";
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { checkInternet } from '../helper/Utils';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function CategoryDetails({ navigation, route }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }
    const [loading, setLoding] = useState(false);
    const [service, setService] = useState('');
    const [categoryDetail, setGetCategoryDetail] = useState([])
    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    useEffect(() => {
        getCategoryDetail();
    }, []);

    const getCategoryDetail = async (vender) => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                lang_id: 1,
                vendor_id: vender ? vender : route.params.product_id,
            }
            var response = await Helper.POST(Urls.categoryDetail, apiData);
            if (response.error === '0') {
                setGetCategoryDetail(response.data)
                console.log(response.data, 'getProductDetail data----');
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    console.log(categoryDetail, 'categoryDetail');

    const images = [
        "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
    ]

    const images1 = [
        require('../assets/Images/ads2.png'),
        require('../assets/Images/ads3.png'),
        require('../assets/Images/ads.png'),
    ]

    const data = [
        {
            'id': 1,
            'title': 'oxygen1',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'
        },
        {
            'id': 2,
            'title': 'oxygen2',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': ''
        },
        {
            'id': 3,
            'title': 'oxygen3',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'
        },
        {
            'id': 4,
            'title': 'oxygen4',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'
        },
        {
            'id': 5,
            'title': 'oxygen5',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'

        },
        {
            'id': 6,
            'title': 'oxygen6',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'
        },
        {
            'id': 7,
            'title': 'oxygen7',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'

        },
        {
            'id': 8,
            'title': 'oxygen8',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'

        },
        {
            'id': 9,
            'title': 'oxygen9',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'
        },
        {
            'id': 10,
            'title': 'oxygen10',
            'image': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'

        },
        {
            'id': 11,
            'title': 'oxygen11',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'

        },
        {
            'id': 12,
            'title': 'oxygen12',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'

        },
        {
            'id': 13,
            'title': 'oxygen13',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
            'dummyText': 'It is a long established fact in the set to set You can also customise it using the useAccessibleColors hook.'

        },
        {
            'id': 14,
            'title': 'oxygen14',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
        },
    ]

    const share = () => {
        Share.open({
            title: '123 Care',
            message: '123 Care',
            url: 'https://play.google.com/store/apps/details?id=com.wditechy.ottcare'
        })
    }

    const additionalData = [
        {
            'id': 1,
            'title': 'COST',
            'innerData': [
                { 'id': 1, 'type': 'Chargeable' },
                { 'id': 2, 'type': 'Free' }
            ]
        }, {
            'id': 2,
            'title': 'DELIVERY',
            'innerData': [
                { 'id': 1, 'type': 'Delivery' },
                { 'id': 2, 'type': 'Self pick up' }
            ]
        }, {
            'id': 3,
            'title': 'RENT/BUY',
            'innerData': [
                { 'id': 1, 'type': 'Rent' },
                { 'id': 2, 'type': 'Buy' }
            ]
        }, {
            'id': 4,
            'title': 'VERIFIED',
            'innerData': [
                { 'id': 1, 'type': 'Verified' },
                { 'id': 2, 'type': 'Non-verified' },
            ]
        },
    ]
    return (
        <View backgroundColor={Colors.white} style={{ height: height, width: width }}>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Category Details</Text>
                </HStack>
                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >
                        <Image style={{ height: 22, width: 22 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/share1.png')} />
                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </HStack>
                </HStack>
            </HStack>
            <Loader loading={loading} />
            <ScrollView >
                <View style={{ padding: 8, marginTop: '-1%', marginBottom: 100 }}>
                    <View style={{ padding: 10, }}>
                        <HStack >
                            <SliderBox
                                resizeMode={'cover'}
                                images={images}
                                autoplay={false}
                                disableOnPress={false}
                                dotColor={Colors.secondaryPrimaryColor}
                                inactiveDotColor={Colors.grey2}
                                parentWidth={width - 34}
                                sliderBoxHeight={160}
                                ImageComponentStyle={{
                                    alignItems: 'center', justifyContent: 'center', borderRadius: 8,
                                    overflow: 'hidden', marginTop: 1
                                }}
                            />

                            {/* <HStack justifyContent={'center'} alignContent={'center'} borderRadius={'2xl'}  >
                                <Image resizeMode="contain" borderRadius={'xl'} height={'40'}
                                    alt={"Alternate Text"} width={width / 1.7} alignSelf={'center'} style={{ marginLeft: '20%' }}
                                    source={{ uri: "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg" }} />

                            </HStack> */}
                        </HStack>

                        <VStack mt={'2'} >
                            <HStack justifyContent={'space-between'} >
                                <Text numberOfLines={2} lineHeight={'30'} style={[Styles.titleText, { color: Colors.black, fontSize: 20, width: '70%' }]}>{categoryDetail.title}</Text>
                                <HStack style={{ justifyContent: 'center', }}>
                                    <Image style={[styles.imageStyle, { height: 35, width: 35, }]} source={require('../assets/Images/10.png')} alt="Alternate Text" />
                                    <Image style={[styles.imageStyle, { height: 35, width: 35, marginLeft: 20 }]} source={require('../assets/Images/blackShare.png')} alt="Alternate Text" />
                                </HStack>
                            </HStack>
                            <HStack h={'5'} alignItems={'center'} space={1}>
                                <Image style={{ height: 20, width: 20, marginLeft: '-1%' }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/pin1.png')} />
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.smallText, fontFamily: fonts.Poppins_Medium, }]}>{categoryDetail.city_name}</Text>
                            </HStack>

                            <HStack mt={'1'} >
                                <Image style={{ height: 14, width: 14, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/time.png')} />
                                <Text ml={'2'} style={[Styles.titleText, { fontSize: 14, color: Colors.primaryColor, fontFamily: fonts.Poppins_Medium, }]}>
                                    Open now</Text>

                                <Text ml={'3'} style={[Styles.titleText, { fontSize: 12, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>
                                    10:00 am - 8:00 pm </Text>

                                {/* <Image style={{ height: 20, width: 20, transform: [{ rotate: '270deg' }], tintColor: Colors.chipColor }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/back.png')} /> */}
                            </HStack>



                            <HStack lineHeight={'1'} h={'5'} style={{ alignItems: 'center', }}>
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>4.7</Text>
                                <Image style={{ height: 10, width: 50, marginLeft: '2%', }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/rating.png')} />
                                <Text style={[Styles.titleText, { fontSize: 12, color: Colors.ratingColor, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }]}>16 Ratings</Text>
                            </HStack>


                            <Divider mt={'2'} />
                            {/* direaction,mails icons */}
                            <HStack mt={'2'} justifyContent={'space-between'} alignItems={'center'}>
                                <VStack alignItems={'center'} >
                                    <Pressable onPress={() => Linking.openURL('google.navigation:q=35.6063+51.4008')}>
                                        <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/leftdirecation.png')} />
                                    </Pressable>
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Pressable onPress={() => Linking.openURL('https://parshwatechnologies.info/')}>
                                        <Image style={{ height: 50, width: 50, }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/web.png')} />
                                    </Pressable>
                                </VStack>

                                <VStack alignItems={'center'}>
                                    <Pressable onPress={() => Linking.openURL('mailto:' + categoryDetail.member.email)}>
                                        <Image style={{ height: 40, width: 40, }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/gmail.png')} />
                                    </Pressable>
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Pressable onPress={() => Linking.openURL(`tel:${categoryDetail.member.mobile_no}`)}>
                                        <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/call.png')} />
                                    </Pressable>
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Pressable onPress={() => Linking.openURL('whatsapp://send?text=' + "Hello " + '&phone=91' + categoryDetail.member.mobile_no)}>
                                        <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/greenWp.png')} />
                                    </Pressable>
                                </VStack>


                            </HStack>
                            <Divider mt={'2'} />


                            <Text mt={'2'} style={{ fontSize: 16, color: Colors.black, fontFamily: fonts.Poppins_Medium, }}>
                                Offer & Promotion
                            </Text>
                            <HStack >
                                {/* <View style={{ height: 30, width: 30, backgroundColor: Colors.darkBlue, alignItems: 'center', borderRadius: 2 }}>
                                    <Text style={{ fontSize: 10, color: Colors.white, fontFamily: fonts.Poppins_Medium, textAlign: 'center', paddingVertical: 5 }}>2.4</Text>
                                </View> */}
                                <VStack h={'4'}>
                                    <Text lineHeight={'sm'} style={[Styles.titleText, { fontSize: 10, color: Colors.black, fontFamily: fonts.Poppins_SemiBold, }]}>
                                        17 Ratings </Text>
                                    {/* <Text lineHeight={'sm'} style={[Styles.titleText, { fontSize: 9, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>
                                        123 rating index based on 10 ratings across the web</Text> */}
                                </VStack>
                            </HStack>
                            <Divider mt={'2'} />
                            {/* Additional Details */}
                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginTop: '2%', }]}>Additional Details</Text>
                            <VStack ml={'4'} >
                                <HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Medical</Text>
                                    </HStack>

                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Health</Text>
                                    </HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Travel</Text>
                                    </HStack>
                                </HStack>
                                <HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Insurance</Text>
                                    </HStack>

                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Health</Text>
                                    </HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Medical</Text>
                                    </HStack>
                                </HStack>

                                {/* <HStack style={[styles.card, {
                                    paddingVertical: 3, paddingHorizontal: '4%',
                                    backgroundColor: Colors.lightSkyBlue, borderColor: Colors.black, borderWidth: 1
                                }]}
                                    rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                    <Text style={{
                                        fontFamily: fonts.Poppins_Medium,
                                        fontSize: 12,
                                        color: Colors.black,
                                    }}>Medical</Text>
                                </HStack >

                                <HStack style={[styles.card, {
                                    paddingVertical: 3, paddingHorizontal: '4%',
                                    backgroundColor: Colors.lightSkyBlue, borderColor: Colors.black, borderWidth: 1
                                }]}
                                    rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                    <Text style={{
                                        fontFamily: fonts.Poppins_Medium,
                                        fontSize: 12,
                                        color: Colors.black,
                                    }}>Health</Text>
                                </HStack >

                                <HStack style={[styles.card, {
                                    paddingVertical: 3, paddingHorizontal: '4%',
                                    backgroundColor: Colors.lightSkyBlue, borderColor: Colors.black, borderWidth: 1
                                }]}
                                    rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                    <Text style={{
                                        fontFamily: fonts.Poppins_Medium,
                                        fontSize: 12,
                                        color: Colors.black,
                                    }}>Travel</Text>
                                </HStack > */}

                            </VStack>

                            {/* Speciality */}
                            <Text mt={'1'} style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>Speciality</Text>
                            <VStack ml={'4'}>
                                <HStack >
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Pathology</Text>
                                    </HStack>

                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Neurology</Text>
                                    </HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Surgery</Text>
                                    </HStack>
                                </HStack>
                                <HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Pathology</Text>
                                    </HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Anesthesiolgy</Text>
                                    </HStack>
                                    <HStack style={{ width: '35%' }}>
                                        <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/true.png')} />
                                        <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Neurology</Text>
                                    </HStack>
                                </HStack>

                                {/* <HStack style={[styles.card, {
                                    paddingVertical: 3, paddingHorizontal: '4%',
                                    backgroundColor: Colors.lightSkyBlue, borderColor: Colors.black, borderWidth: 1
                                }]}
                                    rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                    <Text style={{
                                        fontFamily: fonts.Poppins_Medium,
                                        fontSize: 12,
                                        color: Colors.black,
                                    }}>Pathology</Text>
                                </HStack >

                                <HStack style={[styles.card, {
                                    paddingVertical: 3, paddingHorizontal: '4%',
                                    backgroundColor: Colors.lightSkyBlue, borderColor: Colors.black, borderWidth: 1
                                }]}
                                    rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                    <Text style={{
                                        fontFamily: fonts.Poppins_Medium,
                                        fontSize: 12,
                                        color: Colors.black,
                                    }}>Neurology</Text>
                                </HStack >

                                <HStack style={[styles.card, {
                                    paddingVertical: 3, paddingHorizontal: '4%',
                                    backgroundColor: Colors.lightSkyBlue, borderColor: Colors.black, borderWidth: 1
                                }]}
                                    rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                    <Text style={{
                                        fontFamily: fonts.Poppins_Medium,
                                        fontSize: 12,
                                        color: Colors.black,
                                    }}>Surgery</Text>
                                </HStack > */}

                            </VStack>
                            {/* <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Select Insurance Company
                                </Text> */}
                            <Box maxW="310" mt={'1'} alignSelf={'center'}>
                                <Select h={'10'} fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor}
                                    minWidth="310" accessibilityLabel="Select Insurance Company" placeholder="Select Insurance Company" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckCircleIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                    <Select.Item label="UX Research" value="ux" />
                                    <Select.Item label="Web Development" value="web" />
                                    <Select.Item label="Cross Platform Development" value="cross" />
                                    <Select.Item label="UI Designing" value="ui" />
                                    <Select.Item label="Backend Development" value="backend" />
                                </Select>
                            </Box>
                            {/* </HStack> */}

                            {/* Network */}
                            <Text mt={'1'} style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>Network</Text>
                            <HStack ml={'4'} >
                                <HStack style={{ width: '35%' }}>
                                    <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/true.png')} />
                                    <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Network 1</Text>
                                </HStack>
                                <HStack style={{ width: '35%' }}>
                                    <Image mr={2} style={{ height: 14, width: 19, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/true.png')} />
                                    <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black, }}>Network 2</Text>
                                </HStack>
                            </HStack>

                            {/* <HStack style={{
                                paddingHorizontal: 6, paddingVertical: 1, width: '13%', backgroundColor: Colors.lightSkyBlue,
                                justifyContent: 'space-between'
                            }} rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                <View style={{ backgroundColor: Colors.white, borderRadius: 13 / 1, width: 13, height: 13, alignItems: 'center', }}>
                                    <Text style={{ fontSize: 10, color: Colors.black, fontFamily: fonts.Poppins_Medium, textAlign: 'center', bottom: 3 }} >???</Text>
                                </View>
                                <Text style={{ fontSize: 9, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }}>Pay</Text>
                            </HStack > */}

                            {/* about us */}
                            <Divider mt={'2'} />

                            <Text onTextLayout={onTextLayout} lineHeight={'sm'} numberOfLines={textShown ? undefined : 2} style={[Styles.titleText, { fontSize: 17, color: Colors.primaryColor, fontFamily: fonts.Poppins_Medium, marginTop: '3%', }]}>
                                About Us
                                <Text mr={'2'} color={Colors.black} fontFamily={fonts.Poppins_Medium} fontSize={9} alignSelf={'center'}>
                                    {'     '} {categoryDetail.description}
                                </Text>
                            </Text>
                            {
                                lengthMore ? <Text
                                    onPress={toggleNumberOfLines}
                                    style={{ fontFamily: fonts.Poppins_ExtraBold, fontSize: 10, alignSelf: 'flex-end', backgroundColor: Colors.white, marginTop: '-5%', width: '22%', textAlign: 'right' }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                                    : null
                            }

                        </VStack>
                    </View>

                    <View style={{ padding: 10, marginTop: '-6%' }}>
                        <Divider mt={'2'} />
                        {/* rating now */}
                        <HStack style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 5, marginBottom: 5 }} >
                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>Rate this</Text>
                            <HStack justifyContent={'space-between'} w={'72'} alignSelf={'center'} mt={'2'}>
                                <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: Colors.lightSkyBlue, borderWidth: 1 }}>
                                    <HStack style={{ alignItems: 'center', }}>
                                        <Image style={{ height: 15, width: 15, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Text style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>1</Text>
                                    </HStack>
                                </View>

                                <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: Colors.lightSkyBlue, borderWidth: 1 }}>
                                    <HStack style={{ alignItems: 'center', }}>
                                        <Image style={{ height: 15, width: 15, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Text style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>2</Text>
                                    </HStack>
                                </View>

                                <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: Colors.lightSkyBlue, borderWidth: 1 }}>
                                    <HStack style={{ alignItems: 'center', }}>
                                        <Image style={{ height: 15, width: 15, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Text style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>3</Text>
                                    </HStack>
                                </View>

                                <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: Colors.lightSkyBlue, borderWidth: 1 }}>
                                    <HStack style={{ alignItems: 'center', }}>
                                        <Image style={{ height: 15, width: 15, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Text style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>4</Text>
                                    </HStack>
                                </View>

                                <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: Colors.lightSkyBlue, borderWidth: 1 }}>
                                    <HStack style={{ alignItems: 'center', }}>
                                        <Image style={{ height: 15, width: 15, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Text style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>5</Text>
                                    </HStack>
                                </View>
                            </HStack>
                        </HStack>
                        <Divider mt={'2'} />
                        <SliderBox
                            resizeMode={'cover'}
                            images={images1}
                            autoplay={false}
                            disableOnPress={false}
                            dotColor={Colors.skyBlue}
                            inactiveDotColor={Colors.white}
                            parentWidth={width - 34}
                            sliderBoxHeight={100}
                            ImageComponentStyle={{
                                alignItems: 'center', justifyContent: 'center', borderRadius: 8,
                                overflow: 'hidden', marginTop: '3%'
                            }}
                        />
                    </View>
                    <VStack style={[styles.card, { borderColor: Colors.skyBlue }]} justifyContent={'center'} mt={'1'} m={2}>
                        <HStack alignItems={'center'} justifyContent={'space-between'} p={3}>
                            <HStack>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Related recommendation</Text>
                            </HStack>
                            <Pressable onPress={() => navigation.navigate('Category', { isHospitalData: false })}>
                                <HStack alignItems={'center'} justifyItems={'center'}>
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.smallText }}>View All</Text>
                                </HStack>
                            </Pressable>
                        </HStack>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            {categoryDetail.similar && categoryDetail.similar.map((item, key) => (
                                <View>
                                    <Pressable onPress={() => getCategoryDetail(item.id)}>
                                        <Image style={{
                                            width: 50 * 2,
                                            height: 70,
                                            margin: 5,
                                            marginHorizontal: 13,
                                            resizeMode: 'cover'
                                        }} borderRadius={'md'} source={{
                                            uri: item.image_url
                                        }} alt="Alternate Text" size="md" />

                                        <Text style={{ fontFamily: fonts.Poppins_Medium, fontSize: 11, color: Colors.black, textAlign: 'center', marginBottom: 5 }}>{item.title}</Text>
                                    </Pressable>
                                </View>
                            ))}
                        </ScrollView>
                    </VStack>

                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderColor: Colors.secondaryPrimaryColor,
        borderWidth: 1,
        borderRadius: 8,
        alignContent: 'center',
        margin: 5
    },
    imageStyle: {
        width: 26,
        height: 26,
        resizeMode: 'cover',

    },
    callText: {
        marginTop: 5,
        fontSize: 13,
        color: Colors.black,
        fontFamily: fonts.Poppins_Medium,
    },
    stepCard: {
        backgroundColor: Colors.white, borderRadius: 8,
        height: 140, shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,

    }
});

