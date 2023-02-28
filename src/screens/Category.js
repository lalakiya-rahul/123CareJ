
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions, Pressable, ToastAndroid, Linking } from 'react-native';

import Colors from '../constants/colors';
import { Box, Button, HStack, Icon, Image, Input, Select, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import CommonHeader from '../components/Header';
import CommonChip from '../components/Chip';
import SelectDropdown from 'react-native-select-dropdown'
import Styles from '../constants/styles';
import Modal from "react-native-modal";
import CommonButton from '../components/Button';
import { checkInternet } from '../helper/Utils';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import Loader from '../components/Loader';
import { ActivityIndicator } from '@react-native-material/core';
import { useSelector } from 'react-redux';
import NoData from '../components/NoData';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const like = { uri: 'https://parshwatechnologies.info/website/image/fevoritesRed.png' };
const deslike = { uri: 'https://parshwatechnologies.info/website/image/fav.png' }

export default function Category({ navigation, route }) {
    console.log(route.params);
    const { userDetail } = useSelector((state) => state.reducerDetail);
    const [categoryViewAll, setGetCategoryViewAll] = useState([]);

    const [loading, setLoding] = useState(false);
    const [page, setPage] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);
    const [sorting, setSorting] = useState("");

    useEffect(() => {
        getCategoryViewAll(page, sorting, state.search);
    }, []);

    const initState = {
        search: '',
    }
    const [state, setState] = useState(initState);

    const onInputChange = (field, value) => {
        setState({
            ...state,
            [field]: value,
        })
    }


    const getCategoryViewAll = async (page, sorting, search) => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                page: page ?? 1,
                sort: sorting,
                search: search,
                category_id: route.params.category_id,
                lang_id: 1,
                token: userDetail.token,
                user_id: userDetail.user_id,
            }
            var response = await Helper.POST(Urls.categoryViewAll, apiData);
            if (response.error === '0') {
                // console.log(response.data, 'response---getCategoryViewAll');
                // if (response.data.length > 0) {
                setPage(page + 1);
                setGetCategoryViewAll(response.data);
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }

        }
    }

    const loadMore = async () => {
        if (!loading && !isListEnd) {
            if (checkInternet()) {
                setLoding(true);
                const apiData = {
                    lang_id: 1,
                    user_id: userDetail.user_id,
                    token: userDetail.token,
                    page: page,
                    sort: sorting,
                    category_id: route.params.category_id,
                    search: state.search
                }
                console.log(apiData, 'paiDaya');
                var response = await Helper.POST(Urls.categoryViewAll, apiData);
                console.log(response, 'response---getProductViewAll');
                if (response.error === '0') {
                    if (response.data.length > 0) {
                        setPage(page + 1);
                        console.log(page, 'pagee');
                        // After the response increasing the offset
                        setGetCategoryViewAll([...categoryViewAll, ...response.data]);
                        setLoding(false);

                    } else {
                        setIsListEnd(true);
                        ToastAndroid.show(response.message, ToastAndroid.SHORT);
                        setLoding(false);
                    }

                } else {
                    // ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
                    setLoding(false);
                }

            } else {
                // ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            setLoding(false);
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
                getCategoryViewAll(page - 1, sorting, state.search);
                ToastAndroid.show(response.message, ToastAndroid.SHORT);

            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);

            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    };

    return (

        <View backgroundColor={Colors.white} style={{ height: height, width: width, }}>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text numberOfLines={1} style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Category</Text>
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
            <View style={{ padding: 8, marginTop: '-1%' }}>
                <HStack style={[styles.titleHeaderView, { marginBottom: 8, }]}>

                    <VStack w={'100%'} space={2} alignSelf="center" >
                        <Input h={'10'} placeholder="Search " fontFamily={fonts.Poppins_Medium}
                            variant="rounded" fontSize="12" rounded={'full'}
                            borderColor={Colors.primaryColor}
                            onChangeText={(value) => { onInputChange('search', value), getCategoryViewAll(1, sorting, value) }}
                            value={state.search}
                            InputLeftElement={<Image ml={'4'}
                                alt={"Alternate Text"} size={"4"}
                                source={require('../assets/Images/search.png')} />}
                            InputRightElement={<Image mr={'4'}
                                alt={"Alternate Text"} h={'5'} w={'4'}
                                source={require('../assets/Images/mic.png')} />} />
                    </VStack>
                </HStack>
                <View style={{ marginTop: '1%', marginBottom: '2%' }}>
                    <HStack alignItems={'center'}  >
                        <Box mr={'5'}>
                            <Select fontFamily={fonts.Poppins_SemiBold}
                                style={{ alignItems: 'center', marginLeft: 12, }}
                                selectedValue={sorting}
                                minWidth="100"
                                maxHeight={"10"}
                                rounded={'full'}
                                borderColor={Colors.chipColor}
                                borderWidth={'1'}
                                textAlign={'center'}
                                justifyItems={'center'}
                                dropdownIcon={<Icon
                                    ios="home"
                                    android="home"
                                    style={{ fontSize: 5, color: 'red' }}
                                />}
                                placeholderTextColor={Colors.black}

                                accessibilityLabel="Sort 🝖" placeholder="Sort 🝖" _selectedItem={{
                                    bg: Colors.primaryColor
                                }} onValueChange={(itemValue) => { setSorting(itemValue), getCategoryViewAll(1, itemValue, state.search) }}>
                                <Select.Item label="Latest" value="1" />
                                <Select.Item label="15 day" value="2" />
                                <Select.Item label="More than 30 days" value="3" />
                            </Select>
                        </Box>

                        {/* <CommonChip
                            label={"Filter(3)"}
                            source={require('../assets/Images/filter.png')} /> */}

                        <CommonChip
                            label={"Near Me"}
                            source={require('../assets/Images/pin1.png')} />
                    </HStack>
                </View>
                {loading ? <ActivityIndicator /> :
                    <FlatList
                        contentContainerStyle={{ paddingBottom: '50%', }}
                        data={categoryViewAll}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={<NoData />}
                        renderItem={({ item }) => {
                            let icon = item.is_favourite === "1" ? like : deslike;
                            return (
                                <View style={{ backgroundColor: Colors.white, padding: 5, }}>
                                    <Pressable onPress={() => navigation.navigate("CategoryDetails", { product_id: item.id, title: item.title })}>
                                        <HStack style={[styles.card,
                                        {
                                            backgroundColor: Colors.white,
                                            borderRadius: 10,
                                            justifyContent: 'space-between', padding: 5,
                                        }]}>
                                            <HStack space={3} justifyContent={'space-around'} style={{ width: '100%' }}>
                                                <VStack justifyContent={'center'} alignItems={'center'} style={{ width: '30%' }}>
                                                    <Image style={{
                                                        width: 115,
                                                        height: 115,
                                                        resizeMode: 'contain'
                                                    }} borderRadius={'md'} source={{
                                                        uri: item.image_url
                                                    }} alt="Alternate Text" />

                                                </VStack>

                                                <VStack style={{ width: '68%' }}>
                                                    <HStack justifyContent={'space-between'} >
                                                        <Text numberOfLines={1} style={[Styles.titleText, { color: Colors.black, width: '80%', }]}>{item.title}</Text>
                                                        <Pressable onPress={() => { favoritesApi(item.id) }}>

                                                            <Image style={{ width: 25, height: 25, resizeMode: 'contain', }}
                                                                source={icon && icon} alt="Alternate Text" />


                                                        </Pressable>

                                                    </HStack>
                                                    <HStack h={'5'} alignItems={'center'} style={{ marginTop: '-1%' }}>
                                                        <Image style={{ height: 14, width: 14, marginLeft: '-1%' }}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/pin1.png')} />
                                                        <Text style={[Styles.titleText, { fontSize: 9, color: Colors.grey }]}>{item.city_name}</Text>
                                                    </HStack>
                                                    <HStack style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: '-1%' }}>
                                                        <Image style={{ height: 8, width: 40, marginLeft: '2%', tintColor: Colors.primaryColor }}
                                                            alt={"Alternate Text"}
                                                            source={require('../assets/Images/rating.png')} />
                                                        <Text style={[Styles.titleText, { fontSize: 7, color: Colors.ratingColor, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }]}>16 Ratings</Text>
                                                    </HStack>


                                                    <HStack alignItems={'flex-end'} justifyContent={'flex-end'} space={1} mt={'3'}>
                                                        <Pressable onPress={() => Linking.openURL(`tel:${item.member.mobile_no}`)}>
                                                            <Image style={styles.imageIconSize}
                                                                alt={"Alternate Text"}
                                                                source={require('../assets/Images/call.png')} />
                                                        </Pressable>
                                                        <Pressable onPress={() => Linking.openURL('mailto:' + item.member.email)}>
                                                            <Image ml={'4'} style={styles.imageIconSize}
                                                                alt={"Alternate Text"}
                                                                source={require('../assets/Images/gmail.png')} />
                                                        </Pressable>
                                                        <Pressable onPress={() => Linking.openURL('whatsapp://send?text=' + "Hello " + '&phone=91' + item.member.mobile_no)}>
                                                            <Image ml={'4'} style={styles.imageIconSize}
                                                                alt={"Alternate Text"}
                                                                source={require('../assets/Images/greenWp.png')} />
                                                        </Pressable>
                                                    </HStack>
                                                </VStack>
                                            </HStack>
                                        </HStack>
                                    </Pressable>
                                </View>
                            );
                        }
                        }
                        keyExtractor={(index) => index.toString()}
                    />
                }
            </View >
        </View >
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
    imageIconSize: {
        height: 33, width: 33,
    }
});



