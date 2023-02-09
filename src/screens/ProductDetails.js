import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Dimensions, } from 'react-native';

import Colors from '../constants/colors';
import { HStack, Image, Text, VStack, FlatList, Input, Divider, Stack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import Share from 'react-native-share';
import { map } from 'lodash'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


const ProductDetails = ({ navigation }) => {

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
        <View backgroundColor={Colors.white} style={{ height: height, width: width, }}>
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
                    {/* <HStack style={[styles.titleHeaderView, { marginBottom: 8, }]}>
                        <VStack w={'100%'} space={2} alignSelf="center" >
                            <Input h={'10'} placeholder="Search " fontFamily={fonts.Poppins_Medium}
                                variant="rounded" fontSize="12" rounded={'full'} borderColor={Colors.primaryColor}
                                InputLeftElement={<Image ml={'4'}
                                    alt={"Alternate Text"} size={"4"}
                                    source={require('../assets/Images/search.png')} />}
                                InputRightElement={<Image mr={'4'}
                                    alt={"Alternate Text"} h={'5'} w={'4'}
                                    source={require('../assets/Images/mic.png')} />} />
                        </VStack>
                    </HStack> */}


                    <View style={{ padding: 10, }}>
                        <HStack >
                            <VStack justifyContent={'center'} alignContent={'center'} borderRadius={'2xl'}  >
                                <Image resizeMode="contain" borderRadius={'xl'} height={'40'}
                                    alt={"Alternate Text"} width={width / 1}
                                    source={{ uri: "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg" }} />
                                {/* <Image style={styles.imageStyle} borderRadius={'sm'} source={require('../assets/Images/groupLike.png')} alt="Alternate Text" size="md" /> */}
                            </VStack>
                        </HStack>
                        <VStack mt={'5'} >
                            <HStack justifyContent={'space-between'}>
                                <Text lineHeight={'30'} style={[Styles.titleText, { color: Colors.black, fontSize: 25, }]}>Test image</Text>
                                <HStack style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={[styles.imageStyle, { height: 36, width: 36 }]} source={require('../assets/Images/fevorites.png')} alt="Alternate Text" />
                                    <Image style={[styles.imageStyle, { height: 30, width: 30, marginLeft: 5 }]} source={require('../assets/Images/blackShare.png')} alt="Alternate Text" />
                                </HStack>

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

                            {/* <HStack style={{
                                paddingHorizontal: 6, paddingVertical: 1, width: '13%', backgroundColor: Colors.lightSkyBlue,
                                justifyContent: 'space-between'
                            }} rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                <View style={{ backgroundColor: Colors.white, borderRadius: 13 / 1, width: 13, height: 13, alignItems: 'center', }}>
                                    <Text style={{ fontSize: 10, color: Colors.black, fontFamily: fonts.Poppins_Medium, textAlign: 'center', bottom: 3 }} >₹</Text>
                                </View>
                                <Text style={{ fontSize: 9, color: Colors.black, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }}>Pay</Text>
                            </HStack > */}

                            <HStack mt={'5'} justifyContent={'space-between'} alignItems={'center'}>
                                <VStack alignItems={'center'}>
                                    <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/call.png')} />
                                    <Text style={styles.callText}>Call</Text>
                                </VStack>

                                <VStack alignItems={'center'} >
                                    <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/oregePin.png')} />
                                    <Text style={styles.callText}>Direction</Text>
                                </VStack>

                                <VStack alignItems={'center'}>
                                    <Image style={{ height: 40, width: 40, marginLeft: '2%', }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/greenWp.png')} />
                                    <Text style={styles.callText}>WhatsApp</Text>
                                </VStack>

                                <VStack alignItems={'center'}>
                                    <Image style={{ height: 50, width: 50, }}
                                        alt={"Alternate Text"}
                                        source={require('../assets/Images/web.png')} />
                                    <Text style={[styles.callText, { marginTop: '1%', }]}>Global</Text>
                                </VStack>
                            </HStack>
                        </VStack>

                    </View>
                    <Divider mt={'2'} />

                    <Stack p={'3'}>
                        <VStack>
                            <Text style={{ fontFamily: fonts.Poppins_Medium, fontSize: 15, color: Colors.black, }}>Additional Detalis</Text>
                        </VStack>
                        <HStack>
                            <FlatList
                                contentContainerStyle={{ width: '100%', marginTop: 15 }}
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
                    </Stack>
                    <Divider mt={'2'} />
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

export default ProductDetails;

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
    }
});

