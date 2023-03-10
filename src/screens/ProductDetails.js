import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Dimensions, ToastAndroid, Linking } from 'react-native';

import Colors from '../constants/colors';
import { HStack, Image, Text, VStack, FlatList, Input, Divider, Stack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import Share from 'react-native-share';
import { map, isEmpty } from 'lodash'
import { SliderBox } from "react-native-image-slider-box";
import Loader from '../components/Loader';
import { checkInternet } from '../helper/Utils';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from '@react-native-material/core';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


export default function ProductDetails({ navigation, route }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    const [productDetail, setGetProductDetail] = useState([]);
    const [shareLink, setShareLink] = useState('');
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }
    // const like = require('../assets/Images/fevoritesRed.png');
    // const deslike = require('../assets/Images/10.png')

    const like = { uri: 'https://parshwatechnologies.info/website/image/fevoritesRed.png' };
    const deslike = { uri: 'https://parshwatechnologies.info/website/image/fav.png' }

    const [loading, setLoding] = React.useState(false);

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 3);
    }, []);

    useEffect(() => {
        getProductDetail();
        buildLink();
    }, []);

    const buildLink = async () => {
        const link = await dynamicLinks().buildLink({
            link: `https://invertase.io/ProductDetails/${route.params.product_id}`,
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://care123.page.link',
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
            analytics: {
                campaign: 'banner',
            },
        });

        setShareLink(link)
    }

    // console.log(shareLink, 'sharelink');


    const getProductDetail = async (product) => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                lang_id: 1,
                product_id: product ? product : route.params.product_id,
                user_id: userDetail.user_id
            }
            var response = await Helper.POST(Urls.productDetail, apiData);
            if (response.error === '0') {
                setGetProductDetail(response.data)
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

    const images = [
        "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",

    ]

    const favoritesApi = async (product_id) => {
        console.log(userDetail.user_id, userDetail.token, 'latest product_id');
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                user_id: userDetail.user_id,
                token: userDetail.token,
                product_id: product_id
            }
            var response = await Helper.POST(Urls.favourite, apiData);
            if (response.error === '0') {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    };

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
            url: shareLink
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

    const ratingPart = () => {
        let user_rate = 2
        if (user_rate === 0) {
            alert("0")
            return;
        } else if (user_rate == 1) {
            return (
                <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: Colors.lightSkyBlue, borderWidth: 1 }}>
                    <HStack style={{ alignItems: 'center', }}>
                        <Image style={{ height: 15, width: 15, marginRight: 5 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/star1.png')} />
                        <Text style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>1</Text>
                    </HStack>
                </View>
            )
        } else if (user_rate == 2) {
            return (
                <HStack >
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
                </HStack>
            )
        }
    }

    let icon = productDetail.is_favourite === "1" ? like : deslike;
    let hi = productDetail.is_favourite === "1" ? 40 : 35;
    let wi = productDetail.is_favourite === "1" ? 40 : 35;
    return (
        <View backgroundColor={Colors.white} style={{ height: height, width: width }}>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Product Details</Text>
                </HStack>
                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >

                        {/* <Image style={{ height: 22, width: 22 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/share1.png')} /> */}
                        <Pressable onPress={() => navigation.navigate("Notification")}>
                            <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                                alt={"Alternate Text"}
                                source={require('../assets/Images/notification.png')} />
                        </Pressable>
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
                                images={productDetail.image ? productDetail.image : images}
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
                                        alt={"Alternate Text"} width={width / 1.1} alignSelf={'center'}
                                        source={{ uri: "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg" }} />
                                </HStack>
                            */}
                        </HStack>

                        <VStack mt={'2'} >

                            <HStack justifyContent={'space-between'}>
                                <Text lineHeight={'30'} style={[Styles.titleText, { color: Colors.black, fontSize: 20, }]}>{productDetail.title}</Text>
                                <HStack style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    {loading ? <ActivityIndicator /> :
                                        <Pressable onPress={() => { favoritesApi(productDetail.id), getProductDetail(productDetail.id) }}>
                                            <Image style={{ height: hi, width: wi, resizeMode: 'center' }}
                                                alt={"Alternate Text"}
                                                source={icon && icon} />

                                        </Pressable>
                                    }
                                    <Pressable onPress={() => share()}>
                                        <Image style={[styles.imageStyle, { height: 35, width: 35, marginLeft: 20 }]} source={require('../assets/Images/blackShare.png')} alt="Alternate Text" />
                                    </Pressable>
                                </HStack>
                            </HStack>
                            <HStack h={'5'} alignItems={'center'} space={1}>
                                <Image style={{ height: 20, width: 20, marginLeft: '-1%' }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/pin1.png')} />
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.smallText, fontFamily: fonts.Poppins_Medium, }]}>{productDetail.city_name}</Text>
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

                            <HStack lineHeight={'2.5'} h={'6'} style={{ alignItems: 'center', }}>
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>{productDetail.average_ratting}</Text>
                                <Image style={{ height: 10, width: 50, marginLeft: '2%', }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/rating.png')} />
                                <Text style={[Styles.titleText, { fontSize: 12, color: Colors.ratingColor, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }]}>16 Ratings</Text>
                            </HStack>
                            {/* direaction,mails icons */}
                            <Divider mt={'2'} />
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
                                    <Pressable onPress={() => Linking.openURL('mailto:' + productDetail.member.email)}>
                                        <Image style={{ height: 40, width: 40, }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/gmail.png')} />
                                    </Pressable>
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Pressable onPress={() => Linking.openURL(`tel:${productDetail.member.mobile_no}`)}>
                                        <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/call.png')} />
                                    </Pressable>
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Pressable onPress={() => Linking.openURL('whatsapp://send?text=' + "Hello " + '&phone=91' + productDetail.member.mobile_no)}>
                                        <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/greenWp.png')} />
                                    </Pressable>
                                </VStack>


                            </HStack>
                            <Divider mt={'2'} />

                            {/* Review & Ratings */}
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
                        </VStack>
                    </View>

                    {/* addtionalDetaile */}
                    {/* <Stack p={'3'} style={{ marginTop: '-4%' }}>
                        <HStack>
                            <FlatList
                                contentContainerStyle={{ width: '100%', }}
                                data={productDetail.additional_detail}
                                renderItem={({ item, index }) => {
                                    return (
                                        <HStack style={{ justifyContent: 'flex-start', marginBottom: 5 }}>
                                            <VStack style={{ justifyContent: 'flex-start', width: '30%' }}>
                                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.primaryColor, }}>{item.featured_name}</Text>
                                            </VStack>
                                            <VStack style={{ justifyContent: "flex-end", }}>
                                                <HStack style={{ alignItems: "flex-start", }}>
                                                    {map((item.value && item.value), i => {
                                                        console.log(i.value, 'indexx---');
                                                        return (
                                                            <HStack style={{ width: '35%' }}>
                                                                <Image mr={2} style={{ height: 10, width: 15, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                                                    alt={"Alternate Text"}
                                                                    source={require('../assets/Images/true.png')} />
                                                                <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.black, }}>{i.value}</Text>
                                                            </HStack>)
                                                    })}
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    )
                                }} />
                        </HStack>
                    </Stack> */}

                    <View style={{ padding: 10, marginTop: '-6%' }}>
                        <Divider mt={'1'} />
                        <Text onTextLayout={onTextLayout} lineHeight={'sm'} numberOfLines={textShown ? undefined : 2} style={[Styles.titleText, { fontSize: 17, color: Colors.primaryColor, fontFamily: fonts.Poppins_Medium, marginTop: '3%', }]}>
                            About Us
                            <Text mr={'2'} color={Colors.black} fontFamily={fonts.Poppins_Medium} fontSize={9} alignSelf={'center'}>
                                {'     '} {productDetail.description}
                            </Text>
                        </Text>
                        {
                            lengthMore ? <Text
                                onPress={toggleNumberOfLines}
                                style={{ fontFamily: fonts.Poppins_ExtraBold, fontSize: 10, alignSelf: 'flex-end', backgroundColor: Colors.white, marginTop: '-5%', width: '22%', textAlign: 'right' }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                                : null
                        }
                        <Divider mt={'1'} />

                        {/* rating now */}
                        <HStack style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 5, marginBottom: 5 }} >
                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>Rate this</Text>
                            <HStack justifyContent={'space-between'} w={'72'} alignSelf={'center'} mt={'2'}>

                                {ratingPart}

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
                        <Divider mt={'2'} />

                    </View>
                    <VStack style={[styles.card, { borderColor: Colors.skyBlue }]} justifyContent={'center'} mt={'1'} m={2}>
                        <HStack alignItems={'center'} justifyContent={'space-between'} p={3}>
                            <HStack>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Related recommendation</Text>
                            </HStack>
                            <Pressable onPress={() => navigation.navigate('Product', { viewAll: true })}>
                                <HStack alignItems={'center'} justifyItems={'center'}>
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.smallText }}>View All</Text>
                                </HStack>
                            </Pressable>
                        </HStack>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            {productDetail.similar && productDetail.similar.map((item, key) => (
                                <View>
                                    <Pressable onPress={() => getProductDetail(item.id)}>
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

