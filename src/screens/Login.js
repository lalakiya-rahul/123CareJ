
import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Divider, HStack, Input, VStack } from 'native-base';
import Colors from '../constants/colors'
import Fonts from '../constants/fonts'
import PhoneInput from 'react-native-phone-number-input';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Login({ navigation }) {

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const phoneInput = React.useRef(null);

    const initState = {
        email: '',
        password: '',
        errors: {},

        // deviceToken,deviceTypes, 
    }
    const [state, setState] = React.useState(initState);
    const [loading, setLoding] = React.useState(false);

    const onInputChange = (field, value) => {
        setState({
            ...state,
            [field]: value,
            error: {
                ...state.errors,
                [field]: '',
            },
        })
    }

    // const login = async () => {
    //     if (checkInternet()) {
    //         const messages = {
    //             'email.required': 'Please enter email',
    //             'password.required': 'Please enter password',
    //         };
    //         const rules = {
    //             email: 'required|string',
    //         };

    //         validateAll(state, rules, messages)
    //             .then(async () => {
    //                 setLoding(true);
    //                 const apiData = {
    //                     email: state.email,
    //                     password: state.password
    //                 };
    //                 const { data, error } = await Helper.POST(Urls.login, apiData);
    //                 if (data) {
    //                     setLoding(false);
    //                     console.log('login data', data);
    //                 } else {
    //                     showToast(error, 'error');
    //                     // if (error !== undefined) {
    //                     //     setState({ ...state, errors: error })
    //                     // } else {
    //                     //     showToast('Oops !!! Something went wrong !!!');
    //                     // }
    //                 }
    //             }).catch((error) => {
    //                 const formattedErrors = {};
    //                 error.forEach((e) => {
    //                     console.log(e, 'eeee');
    //                     formattedErrors[e.field] = [e.message]
    //                 });

    //                 setState({
    //                     ...state,
    //                     errors: formattedErrors,
    //                 });
    //             });
    //     } else {
    //         showToast(Urls.nointernet, 'error');
    //     }
    //     //     setLoding(true);
    //     //     var formData = new FormData();
    //     //     formData.append('phone', code + mno.substring(1) + '');
    //     //     console.log('check formData', formData);
    //     //     var response = await Helper.POST(Urls.sendCode, formData);
    //     //     // console.log('check the response', response.status);
    //     //     console.log("🚀 ~  Login.js ~ line 94 ~ ApisendCode ~ formData", formData);

    //     //     if (response.status === true) {
    //     //         setLoding(false);
    //     //         // showToast(response.message, 'success');
    //     //         navigation.navigate('Otpverification', {
    //     //             flag: 'login',
    //     //             name: '',
    //     //             country_id: country_id,
    //     //             Phone: mno,
    //     //             code: code,
    //     //             otp: response.data + '',
    //     //         });
    //     //     } else {
    //     //         setLoding(false);
    //     //         showToast(response.message, 'error');
    //     //     }
    //     // }
    //     // else {
    //     //     showToast(Urls.nointernet, 'error');
    //     // }
    // };

    return (
        <ScrollView>
            <View style={[styles.container]}>
                <VStack alignItems={'center'} p={8}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} style={{ height: 70, width: 220, marginTop: 30 }} />
                        </View>
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, marginTop: 8 }}>
                            Login for a seamless experience
                        </Text>

                        <Input size="xl" mt={'8'} variant="unstyled" p={0} placeholder="Name" placeholderTextColor={Colors.grey2} focusOutlineColor={Colors.white} borderWidth={0} borderBottomColor={Colors.grey2} borderBottomWidth={'1'} />
                        <Input
                            size="xl" mt={'6'} variant="unstyled" h={'8'}
                            p={0} placeholder="Mobile number" placeholderTextColor={Colors.grey2}
                            focusOutlineColor={Colors.white} borderWidth={0}
                            borderBottomColor={Colors.grey2} borderBottomWidth={'1'}
                            InputLeftElement={<HStack bg={'amber.100'}>
                                <PhoneInput
                                    containerStyle={{ width: 80 }}
                                    textContainerStyle={{ width: 1, backgroundColor: Colors.white }}
                                    textInputStyle={{ width: 1 }}
                                    flagButtonStyle={{ width: 60 }}
                                    ref={phoneInput}
                                    defaultValue={phoneNumber}
                                    defaultCode="IN"
                                    countryPickerProps={{
                                        countryCodes: ['IN', 'AE', 'US'],
                                    }}
                                    layout="first"
                                    withShadow
                                    // textInputStyle={[styles.formInput, { right: '100%', width: '100%', }]}
                                    countryPickerButtonStyle={{ backgroundColor: Colors.white, }}
                                    // textContainerStyle={{ paddingVertical: 0 }}
                                    onChangeFormattedText={text => {
                                        setPhoneNumber(text);
                                    }}
                                />
                            </HStack>}
                        />

                        <Pressable onPress={() => navigation.navigate('OTP')} style={{ alignSelf: 'flex-end' }}>
                            <View style={{ backgroundColor: Colors.primaryColor, borderRadius: 45 / 2, height: 45, width: 45, justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                <Image source={require('../assets/Images/arrow-top-left.png')} style={{ height: 25, width: 25, tintColor: Colors.white, transform: [{ rotate: '135deg' }], }} />
                            </View>
                        </Pressable>

                    </View>
                    <HStack alignItems={'center'} mt={'8'} w={'full'}>
                        <Divider>  <View style={{ height: 20, width: 40, borderRadius: 30 / 3, backgroundColor: Colors.grey2, zIndex: 1, marginTop: '-3%', alignSelf: 'center' }}>
                            <Text style={{ color: '#F9F8F7', fontSize: 11, alignSelf: 'center', paddingVertical: 3 }}>OR</Text>
                        </View> </Divider>
                    </HStack>

                    <View style={{ flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 50 / 2, height: 50, borderColor: Colors.grey2, borderWidth: 0.5, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50, }}>
                        <Image source={require('../assets/Images/facebook2.png')} style={{ height: 23, width: 23, marginRight: 8 }} />
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, }}>
                            Continue with Facebook
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 50 / 2, height: 50, borderColor: Colors.grey2, borderWidth: 0.5, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
                        <Image source={require('../assets/Images/google.png')} style={{ height: 23, width: 23, marginRight: 8 }} />
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, }}>
                            Continue with Google
                        </Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, marginTop: 40 }}>
                            Register here
                        </Text>
                    </Pressable>
                </VStack>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable onPress={() => navigation.navigate('BottomTab')}>
                    <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, }}>
                        Maybe Later
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: Colors.white,
        flex: 1,
        height: height
    },
    bottomContainer: {
        position: 'absolute',
        left: '40%',
        bottom: 30,

    }
})