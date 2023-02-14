import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions, } from 'react-native';

import Colors from '../constants/colors';
import { Avatar, Box, Button, HStack, Image, Input, Text, VStack, Modal, CheckBox, Checkbox, Radio, Stack } from 'native-base';
import fonts from '../constants/fonts';
import CommonHeader from '../components/Header';
import SelectDropdown from 'react-native-select-dropdown';
import Styles from '../constants/styles';
import CommonButton from '../components/Button';
import { SliderBox } from "react-native-image-slider-box";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

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

const data2 = [
    {
        'id': 1,
        'title': 'Interiors',
        'image': require('../assets/Images/livingroom.png'),

    },
    {
        'id': 2,
        'title': 'Hospital',
        'image': require('../assets/Images/medical-kit.png'),
    },
    {
        'id': 3,
        'title': 'clinic',
        'image': require('../assets/Images/handshake.png'),
    },
    {
        'id': 4,
        'title': 'Travel',
        'image': require('../assets/Images/plane.png'),
    },
    {
        'id': 5,
        'title': 'Beauty',
        'image': require('../assets/Images/beauty.png'),
    },
    {
        'id': 6,
        'title': 'Education',
        'image': require('../assets/Images/education.png'),
    },
    {
        'id': 7,
        'title': 'Consultants',
        'image': require('../assets/Images/discussion.png'),
    },
    {
        'id': 8,
        'title': 'Jobs',
        'image': require('../assets/Images/businessman.png'),
    },
    {
        'id': 9,
        'title': 'Wedding Requisites',
        'image': require('../assets/Images/parents.png'),
    },
    {
        'id': 10,
        'title': 'Rent & Hire',
        'image': require('../assets/Images/deal.png'),
    },
    {
        'id': 11,
        'title': 'Repairs & Services',
        'image': require('../assets/Images/repair-tools.png'),
    },
    {
        'id': 12,
        'title': 'Loans',
        'image': require('../assets/Images/personal.png'),
    },
    {
        'id': 13,
        'title': 'Contractors',
        'image': require('../assets/Images/engineer.png'),
    },
    {
        'id': 14,
        'title': 'Real Estate',
        'image': require('../assets/Images/real-estate.png'),
    },
    {
        'id': 15,
        'title': 'Home Services',
        'image': require('../assets/Images/vacuum.png'),
    },
    {
        'id': 16,
        'title': 'Rent & Hire',
        'image': require('../assets/Images/deal.png'),
    },
    {
        'id': 17,
        'title': 'Interiors',
        'image': require('../assets/Images/livingroom.png'),

    },
    {
        'id': 18,
        'title': 'B2B',
        'image': require('../assets/Images/handshake.png'),
    },
    {
        'id': 19,
        'title': 'Doctors',
        'image': require('../assets/Images/medical-kit.png'),
    },
    {
        'id': 20,
        'title': 'Travel',
        'image': require('../assets/Images/plane.png'),
    },
    {
        'id': 21,
        'title': 'Beauty',
        'image': require('../assets/Images/beauty.png'),
    },
    {
        'id': 22,
        'title': 'Education',
        'image': require('../assets/Images/education.png'),
    },
    {
        'id': 23,
        'title': 'Consultants',
        'image': require('../assets/Images/discussion.png'),
    },
    {
        'id': 24,
        'title': 'Jobs',
        'image': require('../assets/Images/businessman.png'),
    },
    {
        'id': 25,
        'title': 'Wedding Requisites',
        'image': require('../assets/Images/parents.png'),
    },
    {
        'id': 26,
        'title': 'Rent & Hire',
        'image': require('../assets/Images/deal.png'),
    },
    {
        'id': 27,
        'title': 'Repairs & Services',
        'image': require('../assets/Images/repair-tools.png'),
    },
    {
        'id': 28,
        'title': 'Loans',
        'image': require('../assets/Images/personal.png'),
    },
    {
        'id': 29,
        'title': 'Contractors',
        'image': require('../assets/Images/engineer.png'),
    },
    {
        'id': 30,
        'title': 'Real Estate',
        'image': require('../assets/Images/real-estate.png'),
    },
    {
        'id': 31,
        'title': 'Home Services',
        'image': require('../assets/Images/vacuum.png'),
    },
    {
        'id': 32,
        'title': 'Rent & Hire',
        'image': require('../assets/Images/deal.png'),
    },

]

const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", // Network image
]


export default function Home({ navigation }) {
    const [isModalVisible, setModalVisible] = React.useState(false);

    const countries = ['IND', 'U.K', 'A.E.D']

    return (
        <View style={{ marginBottom: '20%', backgroundColor: Colors.white, }}>
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[Styles.container, { marginBottom: 610 }]}>
                    <VStack style={[styles.stepCard, { height: null }]}>
                        <HStack style={{ justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginBottom: '2%', marginTop: '2%' }}>
                            <View style={{ height: 65, width: 65, borderRadius: 65 / 1, backgroundColor: '#00247D1A', alignItems: 'center', alignSelf: 'center', }}>
                                <Image
                                    style={{ height: 50, width: 50, resizeMode: 'stretch', alignSelf: 'center', justifyContent: 'center', marginTop: '10%', tintColor: Colors.secondaryPrimaryColor }}
                                    source={require('../assets/Images/walk.png')} alt="Alternate Text" />
                            </View>
                            <VStack>
                                <Text style={{ fontSize: 14, color: Colors.primaryColor, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>Today's </Text>
                                <Text style={{ fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>230</Text>

                            </VStack>
                            <VStack>
                                <Text style={{ fontSize: 14, color: Colors.primaryColor, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>Yesterday</Text>
                                <Text style={{ fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Bold, textAlign: 'center', paddingVertical: 8, }}>10021</Text>
                            </VStack>
                        </HStack>
                    </VStack>

                    {/* <VStack mt={'3'} style={styles.stepCard}> */}
                    <SliderBox
                        resizeMode={'cover'}
                        images={images}
                        autoplay={false}
                        disableOnPress={false}
                        dotColor={Colors.skyBlue}
                        inactiveDotColor={Colors.white}
                        parentWidth={width - 20}
                        sliderBoxHeight={100}
                        ImageComponentStyle={{
                            alignItems: 'center', justifyContent: 'center', borderRadius: 8,
                            overflow: 'hidden', marginTop: '3%'
                        }}
                    />
                    {/* </VStack> */}
                    <View style={{ borderWidth: 1, borderRadius: 8, marginTop: '4%', borderColor: Colors.skyBlue }}>
                        <HStack style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white, width: '18%', height: '34%', alignSelf: 'center', position: 'absolute', marginTop: '-3%', }}>
                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 15, color: Colors.primaryColor, }}>
                                Finder
                            </Text>
                        </HStack>
                        <HStack style={{ justifyContent: 'space-around', alignItems: 'center', padding: 8, marginTop: 3 }} >
                            <Pressable style={{ alignItems: 'center', justifyContent: 'center', }}
                                onPress={() => setModalVisible(true)} >
                                <VStack>
                                    <Image
                                        style={{ height: 30, width: 30, resizeMode: 'stretch', alignSelf: 'center', justifyContent: 'center', }}
                                        source={{ uri: 'https://parshwatechnologies.info/website/image/finder.png' }} alt="Alternate Text" />
                                    <Text numberOfLines={2} width={'16'} letterSpacing={'sm'} lineHeight={'sm'} textAlign={'center'} alignSelf={'center'} style={[Styles.titleText, { fontSize: 11 }]}>Insurance Finder</Text>
                                </VStack>
                            </Pressable>
                            <Pressable style={{ alignItems: 'center', justifyContent: 'center', }}
                                onPress={() => setModalVisible(true)} >
                                <VStack>
                                    <Image
                                        style={{ height: 30, width: 30, resizeMode: 'stretch', alignSelf: 'center', justifyContent: 'center', }}
                                        source={{ uri: 'https://parshwatechnologies.info/website/image/bank.png' }} alt="Alternate Text" />
                                    <Text numberOfLines={2} width={'12'} letterSpacing={'sm'} lineHeight={'sm'} textAlign={'center'} alignSelf={'center'} style={[Styles.titleText, { fontSize: 11 }]}>ATM</Text>
                                </VStack>
                            </Pressable>
                            <Pressable style={{ alignItems: 'center', justifyContent: 'center', }}
                                onPress={() => setModalVisible(true)} >
                                <VStack>
                                    <Image
                                        style={{ height: 30, width: 30, resizeMode: 'stretch', alignSelf: 'center', justifyContent: 'center', }}
                                        source={{ uri: 'https://parshwatechnologies.info/website/image/map.png' }} alt="Alternate Text" />
                                    <Text numberOfLines={2} width={'12'} letterSpacing={'sm'} lineHeight={'sm'} textAlign={'center'} alignSelf={'center'} style={[Styles.titleText, { fontSize: 11 }]}>Metro Station</Text>
                                </VStack>
                            </Pressable>
                        </HStack>
                    </View>

                    <View >
                        <HStack mt={'1'}>
                            {/* <Text style={{ fontFamily: fonts.Poppins_Medium, fontSize: 12, color: Colors.smallText }}>Browse by </Text>
                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}>Category</Text> */}
                        </HStack>
                        <ScrollView
                            horizontal
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            <FlatList
                                data={data2}
                                contentContainerStyle={{ alignSelf: 'center', }}
                                numColumns={Math.ceil(data2.length / 3)}
                                renderItem={({ item, index }) => {
                                    return (
                                        <VStack style={{ width: width / 4, padding: 8 }}>
                                            <Pressable style={{ alignItems: 'center', justifyContent: 'center', }}
                                                onPress={() => item.id === 1 ? setModalVisible(true) : item.id === 2 || item.id === 3 ? navigation.navigate('Product', { isHospitalData: true }) : navigation.navigate('Product', { isHospitalData: false })} >
                                                <Image
                                                    style={{ height: 30, width: 30, resizeMode: 'stretch' }}
                                                    borderColor={Colors.secondaryPrimaryColor}
                                                    source={item.image} alt="Alternate Text" />

                                                <Text numberOfLines={2} width={'12'} letterSpacing={'sm'} lineHeight={'sm'} textAlign={'center'} alignSelf={'center'} style={[Styles.titleText, { fontSize: 11 }]}>{item.title}</Text>
                                            </Pressable>
                                        </VStack>
                                    );
                                }
                                }
                                keyExtractor={(item) => item.id.toString()}
                            />
                        </ScrollView>
                        <HStack style={{ justifyContent: 'center', alignItems: 'center', marginTop: '-2%' }}>
                            <Text color={Colors.primaryColor}>{'\u2B24'}</Text>
                            <Text pl={'2'} color={Colors.grey2}>{'\u2B24'}</Text>
                            <Text pl={'2'} color={Colors.grey2}>{'\u2B24'}</Text>
                        </HStack>
                    </View>

                    <Image resizeMode="contain" borderRadius={'xl'} height={'24'} mt={'2.5'}
                        alt={"Alternate Text"} width={width / 1}
                        source={{ uri: "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg" }} />

                    <View>
                        <HStack alignItems={'center'} justifyContent={'space-between'} mt={'3'}>
                            <HStack>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Letest Ads</Text>
                            </HStack>
                            <Pressable onPress={() => navigation.navigate('Product', { isHospitalData: false })}>
                                <HStack alignItems={'center'} justifyItems={'center'}>
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.smallText }}>View All</Text>

                                </HStack>
                            </Pressable>
                        </HStack>
                        <FlatList
                            contentContainerStyle={{ marginTop: '1%' }}
                            data={data.slice(0, 5)}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ backgroundColor: Colors.white, marginTop: 2 }}>
                                        <Pressable onPress={() => navigation.navigate("ProductDetails")}>
                                            <HStack style={[styles.card,
                                            {
                                                backgroundColor: Colors.white, borderColor: Colors.skyBlue,
                                                borderWidth: 1,
                                                justifyContent: 'space-between', padding: 5, alignItems: 'center', marginTop: '-0.5%'
                                            }]}>
                                                <HStack space={6} justifyContent={'space-between'} >
                                                    <VStack justifyContent={'center'} alignItems={'center'}>
                                                        <Image style={{
                                                            width: 40,
                                                            height: 40,
                                                            resizeMode: 'cover',
                                                            borderRadius: 4,
                                                        }} source={{
                                                            uri: item.image
                                                        }} alt="Alternate Text" size="md" />
                                                    </VStack>

                                                    <VStack >
                                                        <Text style={[Styles.titleText, { fontSize: 13, marginTop: 1, color: Colors.black, }]}>{item.title}</Text>
                                                        <HStack space={1} style={{ alignItems: 'center', justifyContent: 'center', }}>
                                                            <Image style={{ height: 10, width: 10, }}
                                                                alt={"Alternate Text"}
                                                                source={require('../assets/Images/time.png')} />
                                                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>Nov 5th, 2022 at 13:48</Text>

                                                            <Image style={{ height: 10, width: 10, }}
                                                                alt={"Alternate Text"}
                                                                source={require('../assets/Images/pin1.png')} />
                                                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>Ahmedabad</Text>
                                                        </HStack>


                                                    </VStack>
                                                </HStack>

                                                <HStack style={{ alignItems: 'center', justifyContent: 'space-evenly', width: '30%' }} >
                                                    <VStack >
                                                        <Image size={9}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/fevorites.png')} />
                                                    </VStack>
                                                    <VStack >
                                                        <Image size={7}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/call.png')} />
                                                    </VStack>
                                                    <VStack >
                                                        <Image size={7}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/greenWp.png')} />
                                                    </VStack>
                                                </HStack>
                                            </HStack>
                                        </Pressable>
                                    </View>
                                );
                            }
                            }
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                    <View >
                        <VStack style={[styles.card, { borderColor: Colors.skyBlue }]} justifyContent={'center'} >
                            <HStack alignItems={'center'} justifyContent={'space-between'} p={2}>
                                <HStack>
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Featured recommendation</Text>
                                </HStack>
                                <Pressable onPress={() => navigation.navigate('Product', { isHospitalData: false })}>
                                    <HStack alignItems={'center'} justifyItems={'center'}>
                                        <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.smallText }}>View All</Text>
                                    </HStack>
                                </Pressable>
                            </HStack>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {data.map((item, key) => (
                                    <View>
                                        <Pressable onPress={() => navigation.navigate('Product', { isHospitalData: false })}>
                                            <Image style={{
                                                width: 50 * 2,
                                                height: 70,
                                                margin: 5,
                                                marginHorizontal: 13,
                                                resizeMode: 'cover'
                                            }} borderRadius={'md'} source={{
                                                uri: item.image
                                            }} alt="Alternate Text" size="md" />
                                            <Text style={{ fontFamily: fonts.Poppins_Medium, fontSize: 11, color: Colors.black, textAlign: 'center', marginBottom: 5 }}>{item.title}</Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </ScrollView>
                        </VStack>
                    </View>

                    <View >
                        <VStack style={[styles.card, { borderColor: Colors.skyBlue }]} justifyContent={'center'} >
                            <HStack alignItems={'center'} justifyContent={'space-between'} p={3}>
                                <HStack>
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Related recommendation</Text>
                                </HStack>
                                <Pressable onPress={() => navigation.navigate('Product', { isHospitalData: false })}>
                                    <HStack alignItems={'center'} justifyItems={'center'}>
                                        <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.smallText }}>View All</Text>
                                    </HStack>
                                </Pressable>
                            </HStack>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {data.map((item, key) => (
                                    <View>
                                        <Image style={{
                                            width: 50 * 2,
                                            height: 70,
                                            margin: 5,
                                            marginHorizontal: 13,
                                            resizeMode: 'cover'
                                        }} borderRadius={'md'} source={{
                                            uri: item.image
                                        }} alt="Alternate Text" size="md" />

                                        <Text style={{ fontFamily: fonts.Poppins_Medium, fontSize: 11, color: Colors.black, textAlign: 'center', marginBottom: 5 }}>{item.title}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </VStack>
                    </View>

                </View>
            </ScrollView >
            {
                isModalVisible ?
                    <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" size="lg">
                        <Modal.Content>
                            <Modal.CloseButton />
                            <Modal.Header>Insurance Network Finder</Modal.Header>
                            <Modal.Body>
                                <Box w={'full'}>
                                    <SelectDropdown
                                        defaultButtonText='Select Insurance Company  ▼'
                                        buttonStyle={{
                                            backgroundColor: Colors.white, height: 50, width: '100%',
                                            borderColor: Colors.secondaryPrimaryColor, borderWidth: 2, borderRadius: 30
                                        }}
                                        buttonTextStyle={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.smallText }}
                                        data={countries}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />
                                </Box>

                                <Box mt={'2.5'}>
                                    <SelectDropdown
                                        defaultButtonText='Select Network  ▼'
                                        buttonStyle={{
                                            backgroundColor: Colors.white, height: 50, width: '100%',
                                            borderColor: Colors.secondaryPrimaryColor, borderWidth: 2, borderRadius: 30
                                        }}
                                        buttonTextStyle={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.smallText }}
                                        data={countries}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />
                                </Box>

                                <Box w={'full'} mt={'2.5'}>
                                    <SelectDropdown
                                        defaultButtonText='Select Near me  ▼'
                                        buttonStyle={{
                                            backgroundColor: Colors.white, height: 50, width: '100%',
                                            borderColor: Colors.secondaryPrimaryColor, borderWidth: 2, borderRadius: 30
                                        }}
                                        buttonTextStyle={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.smallText }}
                                        data={countries}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                    />
                                </Box>

                                <Box w={'full'} mt={'3.5'}>
                                    <Text textAlign={'left'} style={[Styles.titleText, { fontSize: 16 }]}>Select Vendor</Text>
                                    <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
                                        <Stack direction={{
                                            base: "row",
                                            md: "row"
                                        }} alignItems={{
                                            base: "flex-start",
                                            md: "center"
                                        }} space={4} w="75%" mt={'2.5'} maxW="300px">
                                            <Radio value="1" size="sm" my={1} >
                                                <Text style={[Styles.titleText, { fontSize: 12, color: Colors.black }]}>Pharmacy</Text>
                                            </Radio>
                                            <Radio value="2" size="sm" my={1}>
                                                <Text style={[Styles.titleText, { fontSize: 12, color: Colors.black }]}>Hospitals</Text>
                                            </Radio>
                                            <Radio value="3" size="sm" my={1}>
                                                <Text style={[Styles.titleText, { fontSize: 12, color: Colors.black }]}>Clinic</Text>
                                            </Radio>
                                        </Stack>
                                    </Radio.Group>
                                </Box>

                                <CommonButton
                                    mt={'8'}
                                    label={"Serach"}
                                />

                            </Modal.Body>
                            {/* <Modal.Footer justifyContent={'center'}>
                                
                            </Modal.Footer> */}
                        </Modal.Content>
                    </Modal>
                    :
                    null
            }
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
    titleHeaderView: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stepCard: {
        backgroundColor: Colors.white, borderRadius: 8,
        height: '10%', shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,

    }
});

{/* <ImageBackground style={{ height: 90, width: '100%', borderRadius: 20 }}
                        alt={"Alternate Text"}
                        source={require('../assets/Images/bg2.png')} >
                        <HStack style={{ marginTop: 13, width: '100%', justifyContent: 'space-around' }}>
                            <HStack>
                                <SelectDropdown
                                    dropdownIconPosition='left'
                                    defaultButtonText='Select Categories  ▼'
                                    buttonStyle={{
                                        backgroundColor: Colors.white, height: 30, width: 160,
                                        borderColor: Colors.primaryColor, borderWidth: 1, borderRadius: 20
                                    }}
                                    buttonTextStyle={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.smallText }}
                                    data={countries}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            </HStack>

                            <HStack >
                                <SelectDropdown
                                    dropdownIconPosition='left'
                                    defaultButtonText='Serach'
                                    buttonStyle={{
                                        backgroundColor: Colors.white, height: '100%', width: 160,
                                        borderColor: Colors.primaryColor, borderWidth: 1, borderRadius: 20
                                    }}
                                    buttonTextStyle={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.smallText }}
                                    data={countries}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item
                                    }}
                                />
                            </HStack>
                        </HStack>


                        <HStack style={[styles.card, { paddingVertical: 2, paddingHorizontal: 15, marginBottom: '2%', width: '22%', height: 30, borderRadius: 25, backgroundColor: Colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginLeft: '39%', }]}  >
                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.white, }}>Find</Text>
                        </HStack >

                    </ImageBackground> */}

{/* <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <Image minW={'24'} minH={'8'} source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} />
                    <HStack alignItems={'center'}>
                        <Image mr={'1'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/pin.png')} />
                        <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 11, color: Colors.black }}>Ahmedabad</Text>
                    </HStack>
                </HStack> */}