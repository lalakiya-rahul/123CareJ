import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions, ToastAndroid } from 'react-native';

import Colors from '../constants/colors';
import { AlertDialog, Avatar, Box, Button, Checkbox, Divider, HStack, Image, Input, Select, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';
import { checkInternet } from '../helper/Utils';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { ActivityIndicator } from '@react-native-material/core';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function MyAds({ navigation }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    const data = [
        {
            'id': 1,
            'title': 'Test image',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 2,
            'title': 'Test image1',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 3,
            'title': 'Test image2',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 4,
            'title': 'Test imag3',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 5,
            'title': 'Test imag4',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 6,
            'title': 'Test imag5',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 7,
            'title': 'Test imag6',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 8,
            'title': 'Test imag7',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 9,
            'title': 'Test imag8',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
    ]
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const cancelRef = useRef(null);

    const [getMyAds, setGetMyAds] = useState([])
    const [loading, setLoding] = useState(false);
    const [page, setPage] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        getMyAdsData()
    }, [])

    const getMyAdsData = async () => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                lang_id: 1,
                user_id: userDetail.user_id,
                page: page,
                token: userDetail.token
            }
            var response = await Helper.POST(Urls.myAds, apiData);
            if (response.error === '0') {
                // setPage(page + 1);
                setGetMyAds(response.data)
                setLoding(false);
            } else {
                setIsListEnd(true);
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    const selectAll = (id) => {
        // const mail = getMyAds.forEach(i => console.log(i))
        console.log(id);
    }

    const choosen = (hey) => {
        getMyAds.map((item) => {
            if (item.id === hey.id) {
                item.check = !item.check
                if (item.check === true) {
                    setSelectedItem([item]);
                    console.log('selected:' + item.id);
                } else if (item.check === false) {
                    const i = selectedItem.indexOf(item)
                    if (1 != -1) {
                        selectedItem.splice(i, 1)
                        console.log('unselect:' + item.id)
                        return selectedItem
                    }
                }
            }
        })
        setGetMyAds(getMyAds)
    }

    const myDataDelete = async () => {

        const productIds = getMyAds.filter((i) => i.check == true).map(({ id }) => ([id]));
        const simplifyArray = (productIds = []) => {
            const res = [];
            productIds.forEach(element => {
                element.forEach(el => {
                    res.push(el);
                });
            });
            return res;
        };
        console.log(simplifyArray(productIds).toString());
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                user_id: userDetail.user_id,
                product_id: simplifyArray(productIds).toString(),
                token: userDetail.token
            }

            console.log(apiData, 'api data--');
            var response = await Helper.POST(Urls.myAdsDelete, apiData);
            console.log(response, apiData, 'data');
            if (response.error === '0') {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
                getMyAdsData()

            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }

    }

    return (
        <View>
            {/* <CommonHeader LeftText={'Welcome, Richa'} backIcon={true} titleText={'My Ads'} onPress={() => navigation.goBack()} /> */}
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>My Ads</Text>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >

                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </HStack>
                </HStack>
            </HStack>
            <View style={{ backgroundColor: Colors.white, padding: 10, height: height, width: width, }}>
                {/* <HStack alignItems={'center'} justifyContent={'space-between'} >
                    <VStack w="full" space={5} alignSelf="center" >
                        <Input placeholder="Search My Ads" fontFamily={fonts.Poppins_Medium}
                            variant="rounded" fontSize="12" rounded={'full'} borderColor={Colors.smallText}
                            InputLeftElement={<Image ml={'4'}
                                alt={"Alternate Text"} size={"4"}
                                source={require('../assets/Images/search.png')} />}
                        />
                    </VStack>
                </HStack> */}

                <HStack style={[styles.titleHeaderView, { marginBottom: 8, }]}>

                    <VStack w={'100%'} space={2} alignSelf="center" >
                        <Input h={'10'} placeholder="Search My Ads" fontFamily={fonts.Poppins_Medium}
                            variant="rounded" fontSize="12" rounded={'full'} borderColor={Colors.primaryColor}
                            InputLeftElement={<Image ml={'4'}
                                alt={"Alternate Text"} size={"4"}
                                source={require('../assets/Images/search.png')} />}
                            InputRightElement={<Image mr={'4'}
                                alt={"Alternate Text"} h={'5'} w={'4'}
                                source={require('../assets/Images/mic.png')} />} />
                    </VStack>
                </HStack>
                <HStack mt={'2.5'}>
                    {/* <Checkbox mr={'2.5'} value={ieck} onChange={() => selectAll(getMyAds.map(i.id))} accessibilityLabel="checkbox">
                        <Text style={[Styles.titleText, { fontSize: 12, }]}>Select All</Text>
                    </Checkbox> */}
                    <Pressable onPress={() => setIsOpen(!isOpen)}>
                        <HStack style={[styles.boxStyle, { alignItems: 'center', justifyContent: 'space-between' }]} >
                            <Image alt='delete' source={(require('../assets/Images/delete.png'))} style={{ height: 16, width: 16, marginRight: 5, tintColor: 'white' }} />
                            <Text style={[Styles.titleText, { fontSize: 12, color: 'white' }]}>Delete</Text>
                        </HStack>
                    </Pressable>
                </HStack>
                {loading ? <ActivityIndicator /> :
                    <FlatList
                        contentContainerStyle={{ paddingBottom: '30%' }}
                        data={getMyAds}
                        renderItem={({ item, index }) => {
                            return (
                                <Pressable onPress={() => navigation.navigate("ProductDetails", { product_id: item.id })}>
                                    <HStack style={[styles.card,
                                    {
                                        backgroundColor: Colors.white,
                                        borderRadius: 10, borderWidth: 1,
                                        justifyContent: 'space-between', padding: 10,
                                        marginTop: 10, width: '100%'
                                    }]}>
                                        <HStack space={4}  >

                                            <HStack justifyContent={'center'} alignItems={'center'}>
                                                <Checkbox mr={'2.5'} value={item && item.check} onChange={() => choosen(item)} accessibilityLabel="checkbox" />
                                                <Image style={{
                                                    width: 80,
                                                    height: 80,
                                                    resizeMode: 'cover'
                                                }} borderRadius={'2xl'} source={{
                                                    uri: item.image_url
                                                }} alt="Alternate Text" size="md" />
                                            </HStack>

                                            <VStack width={'72'} >
                                                <Text style={Styles.titleText}>{item.title}</Text>
                                                <HStack space={1} style={{ alignItems: 'center', justifyContent: 'flex-start', }}>
                                                    <Image tintColor={Colors.grey}
                                                        style={{ height: 10, width: 10 }}
                                                        alt={"Alternate Text"}
                                                        source={require('../assets/Images/time.png')} />
                                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>{item.created_at}</Text>

                                                    <Image tintColor={Colors.grey}
                                                        alt={"Alternate Text"}
                                                        style={{ height: 10, width: 10 }}
                                                        source={require('../assets/Images/pin1.png')} />
                                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>{item.city_name}</Text>
                                                </HStack>


                                                <HStack space={2}>
                                                    <View style={styles.boxStyle}>
                                                        <Pressable onPress={() => navigation.navigate('AddListing')}>
                                                            <HStack style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                                                                <Image alt='edit' source={(require('../assets/Images/edit.png'))} style={{ height: 15, width: 15, marginRight: 5, tintColor: 'white' }} />
                                                                <Text style={[Styles.titleText, { fontSize: 12, color: 'white', }]}>Edit</Text>
                                                            </HStack>
                                                        </Pressable>
                                                    </View>


                                                </HStack>

                                            </VStack>
                                        </HStack>


                                    </HStack>
                                </Pressable>
                            )
                        }} />

                }
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>Delete Ads</AlertDialog.Header>
                        <AlertDialog.Body>
                            Are you sure you want to delete?
                        </AlertDialog.Body>
                        <AlertDialog.Footer justifyContent={'center'} >
                            <Button.Group space={2}>
                                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                    Cancel
                                </Button>
                                <Button colorScheme={'darkBlue'} onPress={() => myDataDelete()}>
                                    Delete
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.secondaryPrimaryColor,
        borderColor: Colors.secondaryPrimaryColor,
        borderWidth: 3,
        borderRadius: 25,
        justifyContent: 'center',
        shadowColor: Colors.black,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: { width: 0, height: 2 },
        position: 'relative'
    },
    boxStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        borderRadius: 15,
        // borderColor: Colors.smallText,
        paddingHorizontal: 14,
        paddingVertical: 2

    }
});
