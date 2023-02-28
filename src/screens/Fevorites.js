import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions, ToastAndroid } from 'react-native';

import Colors from '../constants/colors';
import { AlertDialog, Avatar, Box, Button, Checkbox, Divider, HStack, Image, Input, Select, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import { checkInternet } from '../helper/Utils';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import NoData from '../components/NoData';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Fevorites({ navigation }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);

    console.log(userDetail, 'user detilesss');

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
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const [getFevorites, setFevorites] = useState([])
    const [loading, setLoding] = useState(false);

    useEffect(() => {
        getFavoritesList();
    }, [])

    const getFavoritesList = async () => {
        if (checkInternet()) {
            setLoding(true);

            const apiData = {
                user_id: userDetail.user_id,
                token: userDetail.token
            }
            console.log(apiData, 'apidata');
            var response = await Helper.POST(Urls.favouriteList, apiData);
            if (response.error === '0') {
                setFevorites(response.data);
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    const favoritesApi = async (product_id) => {
        console.log(product_id, 'latest product_id');
        console.log(userDetail.user_id, userDetail.token, 'latest product_id');
        if (checkInternet()) {
            // setLoding(true);
            const apiData = {
                user_id: userDetail.user_id,
                token: userDetail.token,
                product_id: product_id
            }
            var response = await Helper.POST(Urls.favourite, apiData);
            if (response.error === '0') {
                console.log(response, 'response----favoritesApi');
                getFavoritesList()
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                // setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                // setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    };

    return (
        <View>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Fevorites</Text>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >
                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </HStack>
                </HStack>
            </HStack>
            <View style={{ backgroundColor: Colors.white, padding: 10, height: height, width: width }}>
                <HStack style={[styles.titleHeaderView, { marginBottom: 8, }]}>

                    <VStack w={'100%'} space={2} alignSelf="center" >
                        <Input h={'10'} placeholder="Search Fevorites" fontFamily={fonts.Poppins_Medium}
                            variant="rounded" fontSize="12" rounded={'full'} borderColor={Colors.primaryColor}
                            InputLeftElement={<Image ml={'4'}
                                alt={"Alternate Text"} size={"4"}
                                source={require('../assets/Images/search.png')} />}
                            InputRightElement={<Image mr={'4'}
                                alt={"Alternate Text"} h={'5'} w={'4'}
                                source={require('../assets/Images/mic.png')} />} />
                    </VStack>
                </HStack>

                <Loader loading={loading} />
                <FlatList
                    contentContainerStyle={{ paddingBottom: '50%', }}
                    data={getFevorites}
                    ListEmptyComponent={<NoData />}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => navigation.navigate("ProductDetails", { product_id: item.id, title: item.title })}>
                                <HStack style={[styles.card,
                                {
                                    backgroundColor: Colors.white,
                                    borderRadius: 10, borderWidth: 1,
                                    justifyContent: 'space-between', padding: 10,
                                    marginTop: 10, width: '100%'
                                }]}>
                                    <HStack space={4}  >
                                        <HStack justifyContent={'center'} alignItems={'center'}>
                                            <Image style={{
                                                width: 80,
                                                height: 80,
                                                resizeMode: 'cover'
                                            }} borderRadius={'2xl'} source={{
                                                uri: item.image
                                            }} alt="Alternate Text" size="md" />

                                        </HStack>

                                        <VStack style={{ width: '75%' }} >
                                            <HStack justifyContent={'space-between'}  >
                                                <Text style={Styles.titleText}>{item.title}</Text>
                                                <Pressable onPress={() => { favoritesApi(item.id) }}>

                                                    <Image style={{ width: 35, height: 35, resizeMode: 'contain', position: 'absolute' }}
                                                        source={{ uri: 'https://parshwatechnologies.info/website/image/fevoritesRed.png' }} alt="Alternate Text" />
                                                </Pressable>
                                            </HStack>
                                            <HStack space={1} style={{ alignItems: 'center', justifyContent: 'flex-start', }}>
                                                <Image tintColor={Colors.grey}
                                                    alt={"Alternate Text"}
                                                    style={{ height: 10, width: 10 }}
                                                    source={require('../assets/Images/time.png')} />
                                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>{item.created_at}</Text>

                                                <Image tintColor={Colors.grey}
                                                    alt={"Alternate Text"}
                                                    style={{ height: 10, width: 10 }}
                                                    source={require('../assets/Images/pin1.png')} />
                                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>{item.city_name}</Text>
                                            </HStack>

                                            <HStack space={1} style={{ alignItems: 'center', justifyContent: 'flex-start', marginTop: -8 }}>
                                                <Image style={{ height: 9, width: 12, tintColor: Colors.grey }}
                                                    alt={"Alternate Text"}
                                                    source={require('../assets/Images/eye.png')} />
                                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>42</Text>


                                                {/* <Text style={{ fontFamily: fonts.Poppins_Bold, fontSize: 8, color: Colors.grey, marginLeft: '40%' }}>₹</Text>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>--</Text> */}
                                            </HStack>


                                        </VStack>
                                    </HStack>
                                </HStack>
                            </Pressable>
                        )
                    }} />
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
        borderRadius: 3,
        // borderColor: Colors.smallText,
        paddingHorizontal: 10,
    }
});
