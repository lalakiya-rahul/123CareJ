import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, PermissionsAndroid, Platform, Pressable, FlatList, ScrollView, StyleSheet, Text, ToastAndroid, View, } from 'react-native';

import Colors from '../constants/colors';
import { Box, Checkbox, CheckCircleIcon, Modal, HStack, Icon, Image, Input, Select, TextArea, VStack, AlertDialog, Button } from 'native-base';
import fonts from '../constants/fonts';
import CommonInput from '../components/Inputs';
import PhoneInput from 'react-native-phone-number-input';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';
import { map, isEmpty, findIndex, find, cloneDeep } from 'lodash'
import { checkInternet } from '../helper/Utils';
import { Urls } from '../helper/Urls';
import { Helper } from '../helper/Helper';
import Loader from '../components/Loader';
import { formateString } from '../helper/Validations'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { omitUndefined } from 'native-base/lib/typescript/theme/tools';
import FromErrorText from '../components/FormErrorText';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function AddListing({ navigation }) {
    const { userDetail } = useSelector((state) => state.reducerDetail);
    const [loading, setLoding] = useState(false);
    const [CategoriesId, setCategoriesId] = useState("");
    const [statesId, setStatesId] = useState("");
    const [cityId, setCityId] = useState("");
    const [Categories, setCategories] = useState([]);
    const [states, setStates] = useState([]);
    const [city, setCity] = useState([]);
    const [service, setService] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userInfo, setUserInfo] = useState([]);
    const [additionalData, setAdditionalData] = useState([
        {
            "featured_name": "Cost",
            "featured_id": 1,
            "fields": [
                {
                    "id": 1,
                    "field_id": 1,
                    "value": "Chargable",
                    "status": 1,
                    "created_at": "2023-02-01T12:59:34.000000Z",
                    "updated_at": "2023-02-01T12:59:34.000000Z",
                    "isChecked": false
                },
                {
                    "id": 2,
                    "field_id": 1,
                    "value": "Free",
                    "status": 1,
                    "created_at": "2023-02-01T12:59:34.000000Z",
                    "updated_at": "2023-02-01T12:59:34.000000Z",
                    "isChecked": false
                }
            ]
        },
        {
            "featured_name": "Delivery",
            "featured_id": 2,
            "fields": [
                {
                    "id": 3,
                    "field_id": 2,
                    "value": "Delivery",
                    "status": 1,
                    "created_at": "2023-02-01T12:59:34.000000Z",
                    "updated_at": "2023-02-01T12:59:34.000000Z",
                    "isChecked": false
                },
                {
                    "id": 4,
                    "field_id": 2,
                    "value": "Self pick up",
                    "status": 1,
                    "created_at": "2023-02-01T12:59:34.000000Z",
                    "updated_at": "2023-02-01T12:59:34.000000Z",
                    "isChecked": false
                }
            ]
        }
    ])
    const [storeAddtionalData, setStoreAdditoinalData] = useState([]);
    const phoneInput = useRef(null);
    const [filePath, setFilePath] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const initState = {
        user_id: '',
        lang_id: '',
        token: '',
        title: '',
        description: '',
        tags: '',
        email: '',
        name: '',
        area: '',
        phone: '',
        imageName: '',
    }
    const [state, setState] = useState(initState);

    const initMsg = {
        title: '',
        category: '',
        state: '',
        city: '',
    }
    const [errorsMsg, setErrorsMsg] = useState(initMsg);

    const handleChange = (featured_id, id, fieldItem) => {
        console.log(featured_id, id, fieldItem);
        // const data1 = map(additionalData, i => {
        //     i.featured_id[featured_id]
        // })
        // console.log(data1, 'data12');
    };

    const errorsMessages = () => {
        if (isEmpty(state.title)) {
            setErrorsMsg({ ...errorsMsg, title: 'Title is required' })
        } else if (CategoriesId === "") {
            setErrorsMsg({ ...errorsMsg, category: 'Category Name is required' })
        } else if (statesId === "") {
            setErrorsMsg({ ...errorsMsg, state: 'State is required' })
        } else if (cityId === "") {
            setErrorsMsg({ ...errorsMsg, city: 'City is required' })
        } else {
            setIsOpen(!isOpen)
        }
    }

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
        getCategory();
    }, [isFocused])

    const getData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        setState({
            ...state,
            user_id: JSON.parse(userData).user_id,
            lang_id: JSON.parse(userData).lang_id,
            token: JSON.parse(userData).token,
            email: JSON.parse(userData).email,
            name: JSON.parse(userData).username,
            phone: JSON.parse(userData).mobile_no
        });

    }

    const getCategory = async () => {
        if (checkInternet()) {
            setLoding(true);
            var response = await Helper.GET(Urls.getCategory);
            if (response.error === '0') {
                setCategories(response.data)
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
            getState();

        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    }

    const getState = async () => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                country_id: 1,
            }
            var response = await Helper.POST(Urls.getState, apiData);
            if (response.error === '0') {
                setStates(response.data)
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }

    }

    const getCity = async (statesId) => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                state_id: statesId,
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

    // const requestCameraPermission = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.CAMERA,
    //                 {
    //                     title: 'Camera Permission',
    //                     message: 'App needs camera permission',
    //                 },
    //             );
    //             // If CAMERA Permission is granted
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err) {
    //             console.warn(err);
    //             return false;
    //         }
    //     } else return true;
    // };

    // const requestExternalWritePermission = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 {
    //                     title: 'External Storage Write Permission',
    //                     message: 'App needs write permission',
    //                 },
    //             );
    //             // If WRITE_EXTERNAL_STORAGE Permission is granted
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err) {
    //             console.warn(err);
    //             alert('Write permission err', err);
    //         }
    //         return false;
    //     } else return true;
    // };

    // const captureImage = async () => {
    //     ImagePicker.openCamera({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //     }).then(image => {

    //     })
    //     // let options = {
    //     //     mediaType: type,
    //     //     maxWidth: 300,
    //     //     maxHeight: 550,
    //     //     quality: 1,
    //     //     videoQuality: 'low',
    //     //     durationLimit: 30, //Video max duration in seconds
    //     //     saveToPhotos: true,
    //     // };
    //     // let isCameraPermitted = await requestCameraPermission();
    //     // let isStoragePermitted = await requestExternalWritePermission();
    //     // if (isCameraPermitted && isStoragePermitted) {
    //     //     launchCamera(options, (response) => {

    //     //         if (response.didCancel) {
    //     //             alert('User cancelled camera picker');
    //     //             return;
    //     //         } else if (response.errorCode == 'camera_unavailable') {
    //     //             alert('Camera not available on device');
    //     //             return;
    //     //         } else if (response.errorCode == 'permission') {
    //     //             alert('Permission not satisfied');
    //     //             return;
    //     //         } else if (response.errorCode == 'others') {
    //     //             alert(response.errorMessage);
    //     //             return;
    //     //         }
    //     //         console.log('base64 -> ', response.base64);
    //     //         console.log('uri -> ', response.uri);
    //     //         console.log('width -> ', response.width);
    //     //         console.log('height -> ', response.height);
    //     //         console.log('fileSize -> ', response.fileSize);
    //     //         console.log('type -> ', response.type);
    //     //         console.log('fileName -> ', response.fileName);
    //     //         setFilePath(response.assets[0].uri);
    //     //         setState({
    //     //             ...state,
    //     //             imageName: response.assets[0].fileName
    //     //         })
    //     //     });
    //     // }
    // };
    // const chooseFile = () => {

    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //         multiple: true,
    //         compressImageQuality: 0.8,
    //         includeExif: true,
    //         forceJpg: true,
    //         maxFiles: 2,
    //         mediaType: 'photo',
    //         includeBase64: true
    //     }).then(selImages => {
    //         if (selImages && selImages.length == 1) {
    //             let output = selImages.slice();
    //             output[index] = {
    //                 uri: selImages[0].path, // for FormData to upload
    //                 type: selImages[0].mime,
    //                 name: selImages[0].filename || `${Date.now()}.jpg`,
    //             };
    //             console.log('ImagePicker.openPicker: output', output);
    //             console.log(output, 'output---');
    //         } else {
    //             const output = selImages.map((image) => ({
    //                 uri: image.path,
    //                 type: image.mime,
    //                 name: image.filename || `${Date.now()}.jpg`,
    //             }));
    //             console.log(output, 'output---22');
    //             setFilePath(output);
    //             console.log('ImagePicker.openPicker: output', output);
    //         }


    //     }).catch(e => console.log('error', e.message));
    // };

    const postAds = async () => {
        onClose
        if (checkInternet()) {
            setLoding(true);

            var formdata = new FormData();
            formdata.append('lang_id', 1);
            formdata.append('user_id', state.user_id);
            formdata.append('category', CategoriesId);
            formdata.append('token', state.token);
            formdata.append('city_id', cityId);
            formdata.append('state_id', statesId);
            formdata.append('area', state.area);
            formdata.append('phone', state.phone);
            formdata.append('email', state.email);
            formdata.append('title', state.title);
            formdata.append('description', state.description);
            formdata.append('name', state.name);
            formdata.append('tags', state.tags);
            formdata.append('feature_id[]', [1]);
            var postImage = filePath;
            var uri = '' + postImage;
            var arr = uri.split('/');
            var name = arr[arr.length - 1];

            formdata.append(
                'image[]', filePath
                ? {
                    uri: Platform.OS === 'android' ? postImage : postImage.replace('file://', ''),
                    name: `${Date.now()}.jpg`,
                    type: 'image/jpeg',
                }
                : '',
            );


            console.log(formdata, 'formdata--');
            var response = await Helper.POST(Urls.postAds, formdata);
            console.log(response, 'response post api na data');
            if (response.error === '0') {
                console.log(response, 'responce');
                setLoding(false);
                navigation.navigate("Home");
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }

        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('base64 -> ', response.base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                setFilePath(response.assets[0].uri);
                setState({
                    ...state,
                    imageName: response.assets[0].fileName
                })
            });
        }
    };
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            // console.log('base64 -> ', response.base64);
            // console.log('uri -> ', response.uri);
            // console.log('width -> ', response.width);
            // console.log('height -> ', response.height);
            // console.log('fileSize -> ', response.fileSize);
            // console.log('type -> ', response.type);
            // console.log('fileName -> ', response.fileName);
            setFilePath(response.assets[0].uri);
            setState({
                ...state,
                imageName: response.assets[0].fileName
            })
        });
    };

    return (
        <View>
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
                        <Pressable onPress={() => navigation.navigate("Notification")}>
                            <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                                alt={"Alternate Text"}
                                source={require('../assets/Images/notification.png')} />
                        </Pressable>
                    </VStack>
                </HStack>
            </HStack>
            <Loader loading={loading} />
            <ScrollView >
                <View style={{ flex: 1, backgroundColor: Colors.white, padding: 15, marginTop: '-3%' }}>
                    <View style={[styles.cardView, { marginTop: '1%' }]}>
                        <HStack justifyContent={'center'} alignContent={'center'} style={[styles.card, { backgroundColor: Colors.secondaryPrimaryColor, borderBottomRightRadius: 1, borderBottomLeftRadius: 1, width: '100%' }]}>
                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 18, color: Colors.white, textAlign: 'center' }}>
                                Post Free Ads
                            </Text>
                        </HStack>
                        <VStack p={'3'} h={'80'} borderBottomLeftRadius={'3xl'} borderBottomRightRadius={'3xl'} style={{ backgroundColor: '#FFF' }}>

                            <HStack space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Title
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold}
                                        value={state.title}
                                        onChangeText={(value) => { onInputChange('title', value) }}
                                        borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor}
                                        rounded={'full'} minWidth="250" placeholder="Add Title" />
                                </Box>
                            </HStack>
                            <FromErrorText optionalStyle={{ marginLeft: '30%' }} errorText={errorsMsg.title} />
                            <HStack mt={'1'} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black, }}>
                                    Category
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300">
                                    <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={CategoriesId}
                                        minWidth="250" accessibilityLabel="Select Categories" placeholder="Select Categories" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckCircleIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setCategoriesId(itemValue)}>
                                        {map(Categories, i => {
                                            return (
                                                <Select.Item label={i.slug} value={i.id} />
                                            )
                                        })}

                                    </Select>
                                </Box>
                            </HStack>
                            <FromErrorText optionalStyle={{ marginLeft: '30%' }} errorText={errorsMsg.category} />

                            <VStack mt={'1'}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Description
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="500">
                                    <TextArea fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'}
                                        borderRadius={'2xl'} borderColor={Colors.secondaryPrimaryColor} h={'32'}
                                        value={state.description}
                                        onChangeText={(value) => { onInputChange('description', value) }}
                                        placeholder="Describe what makes your ad unique..." />
                                </Box>
                            </VStack>
                        </VStack>
                    </View>

                    <VStack style={[styles.card, { backgroundColor: Colors.white }]} mt={'5'}>
                        <VStack p={'3'}>
                            <HStack space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Pictures
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'}
                                        borderColor={Colors.secondaryPrimaryColor}
                                        rounded={'full'}

                                        value={state.imageName}
                                        InputRightElement={
                                            <Pressable onPress={() => setModalVisible(true)} style={styles.imagePickerstyle}>
                                                <HStack >
                                                    <Text style={{ alignSelf: 'center', fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.white }}>
                                                        Upload
                                                    </Text>
                                                </HStack>
                                            </Pressable>
                                        }
                                        minWidth="250" placeholder="Upload Pictures" />
                                </Box>
                            </HStack>

                            {/* {
                                filePath?.length > 0 ?
                                    <>

                                        <HStack alignSelf={'flex-end'} w={'56'} >
                                            <FlatList
                                                data={filePath}
                                                horizontal
                                                renderItem={({ item }) => {
                                                    return (
                                                        <HStack alignSelf={'flex-end'} mt={'1'} mb={'1'}>
                                                            <HStack style={{ borderRadius: 5, padding: 2, borderWidth: 1, marginLeft: 5 }}>
                                                                <Image style={{ height: 35, width: 35 }}
                                                                    alt={"Alternate Text"}
                                                                    source={{ uri: item.path && item.path ? item.path : 'https://parshwatechnologies.info/website/image/image-gallery%201.png' }} />
                                                            </HStack>
                                                        </HStack>
                                                    )
                                                }} />
                                        </HStack>
                                    </>
                                    : */}
                            <HStack alignSelf={'flex-end'} w={'56'}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.smallText }}>
                                    Add up to 2 pictures. Use real pictures of your product, not catalogs.
                                </Text>
                            </HStack>
                            {/* } */}
                            <HStack alignSelf={'flex-start'} w={'56'} style={{ marginLeft: width / 4 }}>
                                {/* <Image style={{ height: 50, width: 50, borderRadius: 5, marginRight: '3%' }}
                                    alt={"Alternate Text"}
                                    source={{ uri: response.assets && filePath.assets[0].uri }} /> */}

                            </HStack>

                            <HStack mt={'2'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    State
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300">
                                    <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={statesId}
                                        minWidth="250" accessibilityLabel="Select Location" placeholder="Select State" _selectedItem={{
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
                            <FromErrorText optionalStyle={{ marginLeft: '30%' }} errorText={errorsMsg.state} />

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    City
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300">
                                    <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={cityId}
                                        minWidth="250" accessibilityLabel="Select City" placeholder="Select City" _selectedItem={{
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
                            <FromErrorText optionalStyle={{ marginLeft: '30%' }} errorText={errorsMsg.state} />
                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Area
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold}
                                        value={state.area}
                                        onChangeText={(value) => { onInputChange('area', value) }}
                                        borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor}
                                        rounded={'full'} minWidth="250" placeholder="Add Area" />
                                </Box>
                            </HStack>
                            {CategoriesId &&
                                <HStack>
                                    <FlatList
                                        contentContainerStyle={{ width: '100%', marginTop: 15 }}
                                        data={additionalData}
                                        renderItem={({ item }) => {
                                            return (
                                                <HStack style={{ justifyContent: 'flex-start', marginBottom: 5 }}>
                                                    <VStack style={{ justifyContent: 'flex-start', width: '30%' }}>
                                                        <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black, }}>{item.featured_name}</Text>
                                                    </VStack>
                                                    <VStack style={{ justifyContent: "flex-end", }}>
                                                        <HStack style={{ alignItems: "flex-start", }}>
                                                            {map(item.fields, i => {
                                                                return (
                                                                    <HStack style={{ width: '35%', }}>
                                                                        <Checkbox style={{ marginLeft: 1 }} value={i.isChecked[i.id] || false} onChange={() => handleChange(item.featured_id, i.id, item.fields)}>
                                                                            <Text textAlign={'center'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.black, }}>{i.value}</Text>
                                                                        </Checkbox>
                                                                    </HStack>
                                                                )
                                                            })}
                                                        </HStack>
                                                    </VStack>
                                                </HStack>
                                            )
                                        }} />
                                </HStack>
                            }

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Tags
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'}
                                        borderColor={Colors.secondaryPrimaryColor} rounded={'full'}
                                        value={state.tags}
                                        onChangeText={(value) => { onInputChange('tags', value) }}
                                        minWidth="250" placeholder="Add Tags" />
                                </Box>
                            </HStack>
                        </VStack>
                    </VStack>

                    <View style={[styles.cardView, { marginBottom: '30%', marginTop: '5%' }]}>
                        <HStack justifyContent={'center'} alignContent={'center'} style={[styles.card, { backgroundColor: Colors.secondaryPrimaryColor, borderBottomRightRadius: 1, borderBottomLeftRadius: 1, width: '100%' }]}>
                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 18, color: Colors.white, textAlign: 'center' }}>
                                Posted by
                            </Text>
                        </HStack>

                        <VStack p={'3'} borderBottomLeftRadius={'3xl'} borderBottomRightRadius={'3xl'} style={{ backgroundColor: '#FFF' }}>

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Your Name
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'}
                                        borderColor={Colors.secondaryPrimaryColor} rounded={'full'}
                                        value={state.name}
                                        onChangeText={(value) => { onInputChange('name', value) }}
                                        minWidth="250" placeholder="Enter your name" />
                                </Box>
                            </HStack>

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Phone no
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="250" >
                                    <Input height={"12"} w={'64'} fontFamily={fonts.Poppins_SemiBold}
                                        borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor}
                                        rounded={'full'} placeholder="Enter your mobile no"
                                        maxLength={10}
                                        value={state.phone}
                                        keyboardType={'number-pad'}
                                        onChangeText={(value) => { onInputChange('phone', value) }}
                                        InputLeftElement={<HStack w={'16'} >
                                            <PhoneInput
                                                ref={phoneInput}
                                                defaultValue={phoneNumber}
                                                defaultCode="IN"
                                                countryPickerProps={{
                                                    countryCodes: ['IN', 'AE', 'US'],
                                                }}
                                                layout="first"
                                                withShadow
                                                codeTextStyle={{ color: Colors.white }}
                                                // textInputStyle={[styles.formInput, { right: '100%', width: '100%', }]}
                                                countryPickerButtonStyle={{ backgroundColor: Colors.Transparant, }}
                                                // textContainerStyle={{ paddingVertical: 0 }}
                                                onChangeFormattedText={text => {
                                                    setPhoneNumber(text);
                                                }}
                                            />
                                        </HStack>}
                                    />
                                </Box>
                            </HStack>

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Email
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'}
                                        borderColor={Colors.secondaryPrimaryColor} rounded={'full'}
                                        value={state.email}
                                        keyboardType={'email-address'}
                                        onChangeText={(value) => { onInputChange('email', value) }}
                                        minWidth="250" placeholder="Enter your mail address" />
                                </Box>
                            </HStack>

                            <VStack alignSelf={'center'} mt={'8'}>
                                <HStack alignSelf={'center'}>
                                    {/* <Checkbox mr={'1.5'} isChecked size={'md'} colorScheme="green" /> */}
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}>
                                        I have read and agree to the Terms & Conditions
                                    </Text>
                                </HStack>

                                <HStack alignSelf={'center'} mt={'2'}>
                                    {/* <Checkbox mr={'1.5'} isChecked size={'md'} colorScheme="green" /> */}
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}>
                                        I accept to receive marketing emails
                                    </Text>
                                </HStack>

                                <CommonButton
                                    optionalStyle={{ backgroundColor: Colors.primaryColor }}
                                    mt={'5'}
                                    label={"Submit"}
                                    onPress={() => errorsMessages()}
                                />
                            </VStack>
                        </VStack>
                    </View>
                </View>
                {
                    isModalVisible ?
                        <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" size="lg">
                            <Modal.Content>
                                <Modal.CloseButton />
                                <Modal.Header>Select Image</Modal.Header>
                                <Modal.Body>
                                    <Box w={'full'}>
                                        <Pressable onPress={() => { captureImage('photo'), setModalVisible(false) }}>
                                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                                Take Photo...
                                            </Text>
                                        </Pressable>
                                    </Box>
                                    <Box mt={'2.5'}>
                                        <Pressable onPress={() => { chooseFile('photo'), setModalVisible(false) }}>
                                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                                Choose from library...
                                            </Text>
                                        </Pressable>
                                    </Box>
                                </Modal.Body>
                            </Modal.Content>
                        </Modal>
                        :
                        null
                }
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>Post Ads</AlertDialog.Header>
                        <AlertDialog.Body>
                            You are sure you want to Ad Post?
                        </AlertDialog.Body>
                        <AlertDialog.Footer justifyContent={'center'}>
                            <Button.Group space={2} >
                                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                    Cancel
                                </Button>
                                <Button colorScheme={'darkBlue'} onPress={() => postAds()}>
                                    OK
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </ScrollView >
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.secondaryPrimaryColor,
        borderRadius: 30,
        borderColor: Colors.secondaryPrimaryColor,
        borderWidth: 3,
        alignContent: 'center'
    },
    cardView: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        // borderRadius: 34,
        borderWidth: 3,
        borderColor: Colors.secondaryPrimaryColor,
        width: '100%',
        borderTopRightRadius: 34, borderTopLeftRadius: 34, borderBottomRightRadius: 28, borderBottomLeftRadius: 28,
    },
    imagePickerstyle: {
        zIndex: 1,
        alignItems: 'center',
        position: 'absolute',
        left: '70%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '30%',
        backgroundColor: Colors.primaryColor
    }
});