import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Dimensions, } from 'react-native';

import Colors from '../constants/colors';
import { HStack, Image, Text, VStack, FlatList, Input, Divider, Stack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import Share from 'react-native-share';
import { map } from 'lodash'
import { SliderBox } from "react-native-image-slider-box";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


const HospitalDetails = ({ navigation }) => {

    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    const images = [
        "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
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
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Test images</Text>
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
            <ScrollView >
                <View style={{ padding: 8, marginTop: '-1%' }}>
                    <View style={{ padding: 10, }}>
                        <HStack >
                            {/* <VStack style={styles.stepCard}>
                                <SliderBox
                                    resizeMode={'cover'}
                                    images={images}
                                    autoplay={false}
                                    disableOnPress={false}
                                    dotColor={Colors.secondaryPrimaryColor}
                                    inactiveDotColor={Colors.grey2}
                                    parentWidth={width - 34}
                                    ImageComponentStyle={{ alignItems: 'center', justifyContent: 'center', }}
                                />
                            </VStack> */}
                            <HStack justifyContent={'center'} alignContent={'center'} borderRadius={'2xl'}  >
                                <Image resizeMode="contain" borderRadius={'xl'} height={'40'}
                                    alt={"Alternate Text"} width={width / 1.3}
                                    source={{ uri: "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg" }} />
                                <VStack style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                    <Image style={[styles.imageStyle, { height: 40, width: 40, marginBottom: 20 }]} source={require('../assets/Images/fevorites.png')} alt="Alternate Text" />
                                    <Image style={[styles.imageStyle, { height: 35, width: 35, }]} source={require('../assets/Images/blackShare.png')} alt="Alternate Text" />
                                </VStack>
                            </HStack>
                        </HStack>

                        <VStack mt={'2'} >
                            <HStack justifyContent={'space-between'}>
                                <Text lineHeight={'30'} style={[Styles.titleText, { color: Colors.black, fontSize: 25, }]}>Test image</Text>
                            </HStack>
                            <HStack h={'5'} alignItems={'center'} space={1}>
                                <Image style={{ height: 20, width: 20, marginLeft: '-1%' }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/pin1.png')} />
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.smallText, fontFamily: fonts.Poppins_Medium, }]}>Apple Sqaure, Surat, Gujarat</Text>
                            </HStack>


                            <HStack lineHeight={'2.5'} h={'8'} style={{ alignItems: 'center', }}>
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>4.7</Text>
                                <Image style={{ height: 10, width: 50, marginLeft: '2%', }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/rating.png')} />
                                <Text style={[Styles.titleText, { fontSize: 12, color: Colors.ratingColor, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }]}>16 Ratings</Text>
                            </HStack>

                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginTop: '3%', marginBottom: '1%' }]}>Additional Details</Text>
                            <HStack alignItems={'center'} space={3} >
                                <HStack style={[styles.card, {
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
                                </HStack >

                            </HStack>

                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginBottom: '1%' }]}>Speciality</Text>

                            <HStack alignItems={'center'} space={3} >
                                <HStack style={[styles.card, {
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
                                </HStack >

                            </HStack>

                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginTop: '1%', }]}>Network</Text>

                            <HStack mt={'2'} mb={'2'}>
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
                                    <Text style={{ fontSize: 10, color: Colors.black, fontFamily: fonts.Poppins_Medium, textAlign: 'center', bottom: 3 }} >₹</Text>
                                </View>
                                <Text style={{ fontSize: 9, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }}>Pay</Text>
                            </HStack > */}

                            <HStack mt={'1'} justifyContent={'space-between'} alignItems={'center'}>

                                <VStack alignItems={'center'} >
                                    <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/leftdirecation.png')} />
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Image style={{ height: 50, width: 50, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/web.png')} />
                                </VStack>

                                <VStack alignItems={'center'}>
                                    <Image style={{ height: 42, width: 42, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/gmail.png')} />
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/call.png')} />
                                </VStack>
                                <VStack alignItems={'center'}>
                                    <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/greenWp.png')} />
                                </VStack>


                            </HStack>

                            <Divider mt={'2'} />

                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginTop: '3%', marginBottom: '1%' }]}>Description</Text>
                            <Text onTextLayout={onTextLayout} pt={'1'} numberOfLines={textShown ? undefined : 3} fontFamily={fonts.Poppins_Medium} fontSize={9} alignSelf={'center'}>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            </Text>
                            {
                                lengthMore ? <Text
                                    onPress={toggleNumberOfLines}
                                    style={{ fontFamily: fonts.Poppins_ExtraBold, fontSize: 9, alignSelf: 'flex-end' }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                                    : null
                            }
                        </VStack>
                    </View>
                    {/* <Divider />

                    <Stack p={'3'}>
                        <HStack>
                            <FlatList
                                contentContainerStyle={{ width: '100%', marginTop: 5 }}
                                data={additionalData}
                                renderItem={({ item }) => {
                                    return (
                                        <HStack style={{ justifyContent: 'flex-start', marginBottom: 5 }}>
                                            <VStack style={{ justifyContent: 'flex-start', width: '30%' }}>
                                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.primaryColor, }}>{item.title}</Text>
                                            </VStack>
                                            <VStack style={{ justifyContent: "flex-end", }}>
                                                <HStack style={{ alignItems: "flex-start", }}>
                                                    {map(item.innerData, i => {
                                                        return (
                                                            <HStack style={{ width: '35%' }}>
                                                                <Image mr={2} style={{ height: 10, width: 15, alignSelf: 'center', tintColor: Colors.secondaryPrimaryColor }}
                                                                    alt={"Alternate Text"}
                                                                    source={require('../assets/Images/true.png')} />
                                                                <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.black, }}>{i.type}</Text>
                                                            </HStack>)
                                                    })}
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    )
                                }} />
                        </HStack>
                    </Stack> */}
                    <Divider />
                    <View style={{ padding: 10, }}>
                        <VStack>
                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>Rate this</Text>
                            <HStack justifyContent={'space-between'} w={'72'} alignSelf={'center'} mt={'2'}>
                                <Image style={{ height: 40, width: 40, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/yellowStar.png')} />
                                <Image style={{ height: 40, width: 40, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/whiteStar.png')} />
                                <Image style={{ height: 40, width: 40, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/whiteStar.png')} />
                                <Image style={{ height: 40, width: 40, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/whiteStar.png')} />
                                <Image style={{ height: 40, width: 40, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/whiteStar.png')} />
                            </HStack>
                        </VStack>

                        <Divider mt={'5'} />
                        <VStack mt={'2'}>
                            <Text style={[Styles.titleText, { fontSize: 15, color: Colors.chipColor, fontFamily: fonts.Poppins_Medium, }]}>
                                Delivery Address
                            </Text>
                            <HStack mt={'3'} justifyContent={'space-between'}>
                                <HStack>
                                    <Image style={{ height: 20, width: 20, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/pin1.png')} />
                                    <VStack ml={'3'}>
                                        <Text style={[Styles.titleText, { fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>
                                            Dumas Rd, Surat, Gujarat</Text>
                                        <HStack alignItems={'center'} >
                                            <Image style={{ height: 12, width: 10, marginLeft: '-1%', tintColor: Colors.black }}
                                                alt={"Alternate Text"}
                                                source={require('../assets/Images/copy.png')} />
                                            <Text style={[Styles.titleText, { fontSize: 12, color: Colors.ratingColor, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }]}>
                                                Copy Address</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                                <Image style={{ height: 35, width: 35, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/mapAddress.png')} />
                            </HStack>
                            <HStack mt={'3'} ml={'1'}>
                                <Image style={{ height: 16, width: 16, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/time.png')} />
                                <Text ml={'3'} style={[Styles.titleText, { fontSize: 14, color: Colors.primaryColor, fontFamily: fonts.Poppins_Medium, }]}>
                                    Open now</Text>

                                <Text ml={'3'} style={[Styles.titleText, { fontSize: 12, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>
                                    10:00 am - 8:00 pm </Text>

                                <Image style={{ height: 20, width: 20, transform: [{ rotate: '270deg' }], tintColor: Colors.chipColor }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/back.png')} />
                            </HStack>
                            <HStack mt={'3'} ml={'1'}>
                                <Image style={{ height: 14, width: 14, tintColor: Colors.black }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/call2.png')} />
                                <Text ml={'3'} style={[Styles.titleText, { fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>
                                    (+91) 98765 43210</Text>
                            </HStack>
                            {/* <HStack mt={'3'} >
                                <Image style={{ height: 25, width: 25, tintColor: Colors.black, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/Payment.png')} />
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginLeft: 5 }]}>
                                    Make a payment using G Pay</Text>
                            </HStack> */}

                            <HStack mt={'3'} >
                                <Image style={{ height: 16, width: 16, tintColor: Colors.black, }}
                                    alt={"Alternate Text"}
                                    source={require('../assets/Images/pen.png')} />
                                <Text style={[Styles.titleText, { fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginLeft: 15 }]}>
                                    Edit this listing</Text>
                            </HStack>
                        </VStack>

                        <Divider mt={'5'} />
                        <Text mt={'3'} style={{ fontSize: 16, color: Colors.black, fontFamily: fonts.Poppins_Medium, }}>
                            Review & Ratings
                        </Text>
                        <HStack mt={'3'} >
                            <View style={{ height: 30, width: 30, backgroundColor: Colors.darkBlue, alignItems: 'center', borderRadius: 2 }}>
                                <Text style={{ fontSize: 10, color: Colors.white, fontFamily: fonts.Poppins_Medium, textAlign: 'center', paddingVertical: 5 }}>2.4</Text>
                            </View>
                            <VStack ml={'3'} h={'8'}>
                                <Text lineHeight={'sm'} style={[Styles.titleText, { fontSize: 10, color: Colors.black, fontFamily: fonts.Poppins_SemiBold, }]}>
                                    17 Ratings </Text>
                                <Text lineHeight={'sm'} style={[Styles.titleText, { fontSize: 9, color: Colors.black, fontFamily: fonts.Poppins_Medium, }]}>
                                    123 rating index based on 10 ratings across the web</Text>
                            </VStack>
                        </HStack>

                        <Divider mt={'5'} />
                        <Text mt={'3'} style={{ fontSize: 13, color: Colors.black, fontFamily: fonts.Poppins_Medium, }}>
                            Recent rating trend
                        </Text>
                        <HStack mt={'2'} justifyContent={'space-between'}>
                            <View style={{ height: 35, width: 80, backgroundColor: '#00247D1A', alignItems: 'center', borderRadius: 2, }}>
                                <Text style={{ fontSize: 10, color: Colors.primaryColor, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>All Review</Text>
                            </View>

                            <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: '#00247D1A', borderWidth: 1 }}>
                                <HStack style={{ alignItems: 'center', }}>
                                    <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/star1.png')} />
                                    <Text style={{ fontSize: 10, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>1</Text>
                                </HStack>
                            </View>

                            <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: '#00247D1A', borderWidth: 1 }}>
                                <HStack style={{ alignItems: 'center', }}>
                                    <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/star1.png')} />
                                    <Text style={{ fontSize: 10, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>2</Text>
                                </HStack>
                            </View>

                            <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: '#00247D1A', borderWidth: 1 }}>
                                <HStack style={{ alignItems: 'center', }}>
                                    <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/star1.png')} />
                                    <Text style={{ fontSize: 10, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>3</Text>
                                </HStack>
                            </View>

                            <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: '#00247D1A', borderWidth: 1 }}>
                                <HStack style={{ alignItems: 'center', }}>
                                    <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/star1.png')} />
                                    <Text style={{ fontSize: 10, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>4</Text>
                                </HStack>
                            </View>

                            <View style={{ height: 35, width: 45, alignItems: 'center', borderRadius: 2, borderColor: '#00247D1A', borderWidth: 1 }}>
                                <HStack style={{ alignItems: 'center', }}>
                                    <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/star1.png')} />
                                    <Text style={{ fontSize: 10, color: Colors.reviewText, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>5</Text>
                                </HStack>
                            </View>
                        </HStack>

                        <Divider mt={'5'} />
                        <Text mt={'3'} style={{ fontSize: 16, color: Colors.black, fontFamily: fonts.Poppins_Medium, }}>
                            User Review
                        </Text>
                        <VStack mt={'3'}  >
                            <HStack style={{ alignItems: 'center', }}>
                                <Image style={{ height: 50, width: 50 }}
                                    alt={"Alternate Text"}
                                    rounded={'full'}
                                    source={{ uri: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg' }} />
                                <VStack style={{ marginLeft: '4%', marginBottom: 8 }}>
                                    <Text mt={'3'} style={{ fontSize: 16, color: Colors.black, fontFamily: fonts.Poppins_Bold, }}>
                                        James Lawson
                                    </Text>
                                    <HStack>
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                    </HStack>

                                </VStack>
                            </HStack>
                            <Text mt={'3'} style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Medium, }}>
                                air max are always very comfortable fit, clean and just perfect in every way.
                            </Text>

                            <Text mt={'10'} style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Medium, }}>
                                December 10, 2016
                            </Text>
                        </VStack>

                        <VStack mt={'3'}  >
                            <HStack style={{ alignItems: 'center', }}>
                                <Image style={{ height: 50, width: 50 }}
                                    alt={"Alternate Text"}
                                    rounded={'full'}
                                    source={{ uri: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg' }} />
                                <VStack style={{ marginLeft: '4%', marginBottom: 8 }}>
                                    <Text mt={'3'} style={{ fontSize: 16, color: Colors.black, fontFamily: fonts.Poppins_Bold, }}>
                                        Laura Octavian
                                    </Text>
                                    <HStack>
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                        <Image style={{ height: 12, width: 12, marginRight: 5 }}
                                            alt={"Alternate Text"}
                                            source={require('../assets/Images/star1.png')} />
                                    </HStack>

                                </VStack>
                            </HStack>
                            <Text mt={'3'} style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Medium, }}>
                                air max are always very comfortable fit, clean and just perfect in every way.
                            </Text>

                            <Text mt={'6'} style={{ fontSize: 12, color: Colors.reviewText, fontFamily: fonts.Poppins_Medium, }}>
                                December 10, 2016
                            </Text>
                        </VStack>

                        <Divider mt={'2'} />
                        <Text mt={'3'} style={{ fontSize: 13, color: Colors.chipColor, fontFamily: fonts.Poppins_Medium, alignSelf: 'center' }}>
                            See All Reviews
                        </Text>

                        <Text mt={'1'} style={{ fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Medium, }}>
                            Also Listed in
                        </Text>

                        <Text mt={'1'} style={{ fontSize: 12, color: '#696666', fontFamily: fonts.Poppins_Medium, }}>
                            Fabric Retailers
                        </Text>
                        <Text style={{ fontSize: 12, color: '#696666', fontFamily: fonts.Poppins_Medium, }}>
                            Architects
                        </Text>
                        <Text style={{ fontSize: 12, color: '#696666', fontFamily: fonts.Poppins_Medium, }}>
                            Fabric Wholesalers
                        </Text>
                        <Text style={{ fontSize: 12, color: '#696666', fontFamily: fonts.Poppins_Medium, }}>
                            Interior Designers
                        </Text>
                        <Text style={{ fontSize: 12, color: '#696666', fontFamily: fonts.Poppins_Medium, }}>
                            More...
                        </Text>

                        <Divider mt={'5'} />
                        <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                            <Text style={{ fontSize: 16, color: Colors.black, fontFamily: fonts.Poppins_Medium, }}>
                                Report an issue
                            </Text>
                            <Image style={{ height: 20, width: 20, transform: [{ rotate: '180deg' }], tintColor: Colors.chipColor }}
                                alt={"Alternate Text"}
                                source={require('../assets/Images/back.png')} />
                        </HStack>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default HospitalDetails;

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

