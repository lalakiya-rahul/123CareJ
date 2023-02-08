import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions, } from 'react-native';

import Colors from '../constants/colors';
import { Avatar, Box, Button, HStack, Image, Input, Text, VStack, Modal, FormControl } from 'native-base';
import fonts from '../constants/fonts';
import CommonHeader from '../components/Header';
import SelectDropdown from 'react-native-select-dropdown';
import Styles from '../constants/styles';
import CommonButton from '../components/Button';

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
        'title': 'B2B',
        'image': require('../assets/Images/handshake.png'),
    },
    {
        'id': 3,
        'title': 'Doctors',
        'image': require('../assets/Images/medical-kit.png'),
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


export default function Home({ navigation }) {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const countries = ['IND', 'U.K', 'A.E.D']
    return (
        <View style={{ marginBottom: '20%', backgroundColor: Colors.white }}>
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

                <View style={[Styles.container, { marginBottom: 440 }]}>
                    <Image
                        style={{ height: '10%', width: '100%', resizeMode: 'stretch' }}
                        borderColor={Colors.secondaryPrimaryColor}
                        source={require('../assets/Images/ads.png')} alt="Alternate Text" />

                    <Image
                        style={{ height: '10%', width: '100%', resizeMode: 'stretch', marginTop: '2%' }}
                        borderColor={Colors.secondaryPrimaryColor}
                        source={require('../assets/Images/ads.png')} alt="Alternate Text" />

                    <View >
                        <HStack mt={'3'}>
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
                                numColumns={Math.ceil(data2.length / 4)}
                                renderItem={({ item }) => {
                                    return (
                                        <VStack style={{ width: width / 4, padding: 8 }}>
                                            <Pressable style={{ alignItems: 'center', justifyContent: 'center', }}
                                                onPress={() => navigation.navigate('Product')} >

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
                        <HStack style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text color={Colors.primaryColor}>{'\u2B24'}</Text>
                            <Text pl={'2'} color={Colors.grey2}>{'\u2B24'}</Text>
                            <Text pl={'2'} color={Colors.grey2}>{'\u2B24'}</Text>
                        </HStack>
                    </View>

                    <View>
                        <HStack alignItems={'center'} justifyContent={'space-between'} mt={'0.5'}>
                            <HStack>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Letest Ads</Text>
                            </HStack>
                            <Pressable onPress={() => navigation.navigate('Product')}>
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
                                                backgroundColor: Colors.white, borderColor: Colors.grey2,
                                                borderTopLeftRadius: 35, borderBottomLeftRadius: 35, borderWidth: 1,
                                                justifyContent: 'space-between', padding: 5, alignItems: 'center', marginTop: '-0.5%'
                                            }]}>
                                                <HStack space={6} justifyContent={'space-between'} >
                                                    <VStack justifyContent={'center'} alignItems={'center'} ml={'2.5'}>
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
                                                        <Image size={7}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/FAVOURITESQUARE.jpg')} />
                                                    </VStack>
                                                    <VStack >
                                                        <Image size={7}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/CALLUSSQUARE.jpg')} />
                                                    </VStack>
                                                    <VStack >
                                                        <Image size={7}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/WHATSAPPSQUARE.jpg')} />
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
                        <VStack style={[styles.card, { borderColor: Colors.grey2 }]} justifyContent={'center'} >
                            <HStack alignItems={'center'} justifyContent={'space-between'} p={2}>
                                <HStack>
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Featured recommendation</Text>
                                </HStack>
                                <Pressable onPress={() => navigation.navigate('Product')}>
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
                                        <Pressable onPress={() => navigation.navigate('Product')}>
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
                        <VStack style={[styles.card, { borderColor: Colors.grey2 }]} justifyContent={'center'} >
                            <HStack alignItems={'center'} justifyContent={'space-between'} p={3}>
                                <HStack>
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}> Related recommendation</Text>
                                </HStack>
                                <Pressable onPress={() => navigation.navigate('Product')}>
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

        </View>
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