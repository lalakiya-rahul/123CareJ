import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions, ToastAndroid } from 'react-native';

import Colors from '../constants/colors';
import { Avatar, Box, Checkbox, CheckCircleIcon, Divider, HStack, Image, Input, Select, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import PhoneInput from 'react-native-phone-number-input';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import { map, isEmpty } from 'lodash'
import { checkInternet } from '../helper/Utils';
import { useSelector } from 'react-redux';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function MyProfile({ navigation }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [countryId, setCountryId] = React.useState("");
    const [statesId, setStatesId] = React.useState("");
    const [cityId, setCityId] = React.useState("");
    const [country, setCountry] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [city, setCity] = React.useState([]);
    const phoneInput = React.useRef(null);

    const initState = {
        name: '',
        username: '',
        email: '',
        mobile_no: '',
        profile: ''
    }
    const [state, setState] = React.useState(initState);
    const [loading, setLoding] = React.useState(false);

    const onInputChange = (field, value) => {
        setState({
            ...state,
            [field]: value,
        })
    }

    useEffect(() => {
        if (isEmpty(userDetail.token)) {
            navigation.navigate('Login')
        }
        getData();
        getCountry(countryId);
        getState();
        return () => {
            console.log('This will be logged on unmount');
        };
    }, [])

    const updateProfile = async () => {
        if (checkInternet()) {
            setLoding(true);
            const userData = await AsyncStorage.getItem('userData');
            console.log(userData, 'profile page');
            const apiData = {
                user_id: userData.user_id,
                token: JSON.parse(userData).token,
                profile: JSON.parse(userData).profile,
                username: state.username,
                name: state.name,
                email: state.email,
                mobile_no: state.mobile_no,
                country: countryId,
                state: statesId,
                city: cityId,
            }
            var response = await Helper.POST(Urls.updateProfile, apiData);
            console.log(response, 'profile save');
            if (response.error === '0') {
                console.log(response, 'profile save pchi');
                await AsyncStorage.setItem('userData', JSON.stringify(response.data));
                setLoding(false);
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    console.log(state);
    const getData = async () => {
        setLoding(true);
        const userData = await AsyncStorage.getItem('userData');
        setState({
            ...state,
            name: JSON.parse(userData).name,
            username: JSON.parse(userData).username,
            email: JSON.parse(userData).email,
            mobile_no: JSON.parse(userData).mobile_no,
            profile: JSON.parse(userData).profile
        });
        setCountryId(JSON.parse(userData).country)
        setStatesId(JSON.parse(userData).state)
        setCityId(JSON.parse(userData).city)
        setLoding(false);

    }

    const getCountry = async () => {
        if (checkInternet()) {
            setLoding(true);
            var response = await Helper.GET(Urls.getCountry);
            if (response.error === '0') {
                setCountry(response.data);
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    const getState = async (itemValue) => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                country_id: itemValue,
            }
            var response = await Helper.POST(Urls.getState, apiData);
            if (response.error === '0') {
                setStates(response.data)
                getCity();
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    const getCity = async (itemValue) => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                state_id: itemValue,
            }
            var response = await Helper.POST(Urls.getCity, apiData);
            if (response.error === '0') {
                setCity(response.data)
                setLoding(false);
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
            {/* <CommonHeader LeftText={'Welcome, Richa'} backIcon={true} titleText={'My Profile'} onPress={() => navigation.goBack()} /> */}
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>My Profile</Text>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >
                        <Pressable onPress={() => navigation.navigate("Notification")}>
                            <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                                alt={"Alternate Text"}
                                source={require('../assets/Images/notification.png')} />
                        </Pressable>
                    </HStack>
                </HStack>
            </HStack>
            <Loader loading={loading} />
            <ScrollView style={{ marginBottom: '10%' }}>
                <View style={{ padding: 15, backgroundColor: Colors.white, }}>
                    <HStack  >
                        <HStack >
                            <Image
                                size={110} borderRadius={100}
                                alt="Alternate Text"
                                source={{ uri: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg' }} />
                            <VStack style={{
                                height: 35, width: 35, borderRadius: 33 / 1, bottom: 2, right: 0, justifyContent: 'center',
                                backgroundColor: Colors.primaryColor, alignItems: 'center', position: 'absolute',
                            }}>
                                <Image
                                    style={{ height: 22, width: 22, alignSelf: 'center', tintColor: Colors.white }}
                                    alt="Alternate Text"
                                    source={require('../assets/Images/camera.png')} />

                            </VStack>

                        </HStack>
                        <VStack ml={'8'} alignSelf="flex-start" mt={'7'} >
                            <Text style={Styles.titleText}>{userDetail.name ? userDetail.name : 'Guest'}</Text>
                            <Text style={{ color: Colors.smallText, fontFamily: fonts.Poppins_SemiBold, fontSize: 10 }}>
                                You last logged in at: Jan 19th, 2023 at 11:20
                            </Text>
                        </VStack>
                    </HStack>
                </View>
                <View style={{ backgroundColor: Colors.white, padding: 15, height: height, width: width, marginBottom: 15 }}>


                    {/* <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <Image minW={'24'} minH={'8'} source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} />
                    <HStack alignItems={'center'}>
                        <Image mr={'1'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/pin.png')} />
                        <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 11, color: Colors.black }}>Ahmedabad</Text>
                    </HStack>
                </HStack> */}

                    <Text style={Styles.titleText}>Account Details</Text>
                    <VStack mt={'4'} style={{ alignItems: 'center' }}>
                        {/* <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 16, color: Colors.black }}>
                        Email

                    </Text> */}
                        <Box >
                            <Input fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'}
                                borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'}
                                minWidth="full"
                                value={state.name}
                                onChangeText={(value) => { onInputChange('name', value) }}
                                placeholder="Name" />
                        </Box>

                        <Box mt={'4'}>
                            <Input fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'}
                                borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'}
                                minWidth="full"
                                value={state.username}
                                onChangeText={(value) => { onInputChange('username', value) }}
                                placeholder="Username" />
                        </Box>

                        <Box mt={'4'}>
                            <Input fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'}
                                borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'}
                                minWidth="full"
                                value={state.email}
                                onChangeText={(value) => { onInputChange('email', value) }}
                                placeholder="Email" />
                        </Box>

                        <Box mt={'4'}>
                            <Input height={"12"} w={'full'} fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'} placeholder="Enter your mobile no"
                                value={state.mobile_no}
                                maxLength={10}
                                onChangeText={(value) => { onInputChange('mobile_no', value) }}
                                InputLeftElement={<HStack w={'20'} >
                                    <PhoneInput
                                        ref={phoneInput}
                                        defaultValue={phoneNumber}
                                        defaultCode="IN"
                                        countryPickerProps={{
                                            countryCodes: ['IN', 'AE', 'US'],
                                        }}
                                        layout="first"
                                        withShadow
                                        codeTextStyle={{ color: Colors.white, }}
                                        // textInputStyle={{ right: '100%', width: '0%', }}
                                        countryPickerButtonStyle={{ backgroundColor: Colors.Transparant, }}
                                        textContainerStyle={{ paddingVertical: 25, }}
                                        onChangeFormattedText={text => {
                                            setPhoneNumber(text);
                                        }}
                                    />
                                </HStack>} />
                        </Box>

                        <HStack mt={'2'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Box maxW="full">
                                <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={countryId}
                                    minWidth="full" accessibilityLabel="Select Country" placeholder="Select Country" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckCircleIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => { setCountryId(itemValue), getState(itemValue) }}>
                                    {map(country, i => {
                                        return (
                                            <Select.Item label={i.name} value={i.id} />
                                        )
                                    })}
                                </Select>
                            </Box>
                        </HStack>

                        <HStack mt={'2'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Box maxW="full">
                                <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={statesId}
                                    minWidth="full" accessibilityLabel="Select State" placeholder="Select State" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckCircleIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => { setStatesId(itemValue), getCity(itemValue) }}>
                                    {map(states, i => {
                                        return (
                                            <Select.Item label={i.name} value={i.id} />
                                        )
                                    })}
                                </Select>
                            </Box>
                        </HStack>

                        <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Box maxW="full">
                                <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={cityId}
                                    minWidth="full" accessibilityLabel="Select City" placeholder="Select City" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckCircleIcon size="5" />
                                    }} mt={1} onValueChange={itemValue => setCityId(itemValue)}>
                                    {map(city, i => {
                                        return (
                                            <Select.Item label={i.name} value={i.id} />
                                        )
                                    })}

                                </Select>
                            </Box>
                        </HStack>

                        <CommonButton
                            mt={'3'}
                            label={"Update"}
                            onPress={() => updateProfile()}
                        />

                    </VStack>

                    {/* <Text style={[Styles.titleText, { marginTop: '2%' }]}>Settings</Text>
                    <VStack mt={'4'} style={{ alignItems: 'center' }}>
                       
                        <Box >
                            <Input fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'}
                                borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'}
                                minWidth="full"
                                placeholder="New Password" />
                        </Box>

                        <Box mt={'4'}>
                            <Input fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'}
                                borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'}
                                minWidth="full"
                                placeholder="Confirm Password" />
                        </Box>

                        <HStack mt={'2'} ml={'5'} width={'full'}>
                            <Checkbox isChecked size={'md'} mr={'4'} colorScheme="green" />
                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}>
                                I accept to receive marketing emails
                            </Text>
                        </HStack>

                        <Box mt={'1'}>
                            <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={service}
                                minWidth="full" accessibilityLabel="Select Preferred Time Zone" placeholder="Select Preferred Time Zone" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckCircleIcon size="5" />
                                }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                <Select.Item label="UX Research" value="ux" />
                                <Select.Item label="Web Development" value="web" />
                                <Select.Item label="Cross Platform Development" value="cross" />
                                <Select.Item label="UI Designing" value="ui" />
                                <Select.Item label="Backend Development" value="backend" />
                            </Select>
                            <HStack ml={'4'} mt={'3'}>
                                <Text style={{ fontFamily: fonts.Poppins_Medium, fontSize: 12, }}>
                                    NOTE: If no preferred time zone is selected, the Country's preferred time zone will be used (e.g.<Text style={{ fontWeight: "bold" }}> "Asia/Dubai"</Text>  for <Text style={{ fontWeight: "bold" }}> United Arab Emirates</Text>).
                                </Text>

                            </HStack>
                        </Box>
                        <CommonButton
                            mt={'3'}
                            label={"Update"}
                        />

                    </VStack> */}

                </View>
            </ScrollView>
        </View>
    );
}