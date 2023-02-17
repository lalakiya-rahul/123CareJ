
import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { Divider, HStack, Input, VStack } from 'native-base';
import Colors from '../constants/colors'
import Fonts from '../constants/fonts'
import PhoneInput from 'react-native-phone-number-input';
import { checkInternet, showToast } from '../helper/Utils';
import { validateAll } from 'indicative/validator'
import { Helper } from '../helper/Helper';
import { Urls } from '../helper/Urls';
import Loader from '../components/Loader';
import FormErrorText from '../components/FormErrorText';
import { SelectCountry } from 'react-native-element-dropdown';
import { TextInput } from "@react-native-material/core";
// import { validatePhone } from '../helper/Validations';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Login({ navigation }) {

    const [formattedValue, setFormattedValue] = React.useState("");
    const [country, setCountry] = React.useState('1');
    const phoneInput = React.useRef(null);

    const initState = {
        name: '',
        mobile: '',
        mobileError: ''

        // deviceToken,deviceTypes, 
    }
    const [state, setState] = React.useState(initState);
    const [loading, setLoding] = React.useState(false);

    const onInputChange = (field, value) => {
        setState({
            ...state,
            [field]: value,
        })
    }

    const validatePhone = (value) => {
        if (value.length >= 10) {
            console.log("true");
            return true;
        } else if (value === '') {
            setState({
                ...state,
                mobileError: 'Please enter mobile number'
            })
            // ToastAndroid.show('Please enter mobile number', ToastAndroid.SHORT);
        } else {
            setState({
                ...state,
                mobileError: 'Please enter 10 digit mobile number'
            })
            // ToastAndroid.show('', ToastAndroid.SHORT);
        }
    };

    const login = async () => {
        if (validatePhone(state.mobile)) {
            if (checkInternet()) {
                setLoding(true);
                const apiData = {
                    mobile_no: parseInt(state.mobile),
                    country_id: formattedValue === "" || '+91' ? 1 : 2
                };
                var response = await Helper.POST(Urls.sendOtp, apiData);
                if (response.error === '0') {
                    navigation.navigate('OTP', { phone: state.mobile });
                    setLoding(false);
                } else {
                    ToastAndroid.show(response.message, ToastAndroid.SHORT);
                    setLoding(false);
                }

            } else {
                ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
            }
        }
    };

    return (
        <ScrollView>
            <View style={[styles.container]}>

                <Loader loading={loading} />
                <VStack alignItems={'center'} p={8}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} style={{ height: 70, width: 220, marginTop: 30 }} />
                        </View>
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, marginTop: 8 }}>
                            Login for a seamless experience
                        </Text>



                        <Input size="xl" mt={'8'}
                            variant="unstyled" p={0}
                            placeholder="Name" placeholderTextColor={Colors.grey2}
                            focusOutlineColor={Colors.white} borderWidth={0}
                            borderBottomColor={Colors.grey2} borderBottomWidth={'1'}
                            onChangeText={(value) => { onInputChange('name', value) }}
                        />
                        {/* <HStack >

                            <TextInput label="Name" style={{ width: '100%' }}
                                variant="standard" color={Colors.primaryColor}
                                onChangeText={(value) => { onInputChange('name', value) }}
                            />
                        </HStack> */}
                        <Input
                            size="xl" mt={'6'} variant="unstyled" h={'8'}
                            p={0} placeholder="Mobile number" placeholderTextColor={Colors.grey2}
                            focusOutlineColor={Colors.white} borderWidth={0}
                            borderBottomColor={Colors.grey2} borderBottomWidth={'1'}
                            keyboardType={'number-pad'} maxLength={10}
                            onChangeText={(value) => { onInputChange('mobile', value) }}
                            InputLeftElement={<HStack bg={'amber.100'}>
                                <PhoneInput
                                    containerStyle={{ width: 80 }}
                                    textContainerStyle={{ width: 1, backgroundColor: Colors.white }}
                                    textInputStyle={{ width: 1 }}
                                    flagButtonStyle={{ width: 60 }}
                                    ref={phoneInput}
                                    defaultValue={formattedValue}
                                    defaultCode="IN"
                                    countryPickerProps={{
                                        countryCodes: ['IN', 'AE', 'US'],
                                    }}
                                    layout="first"
                                    withShadow
                                    // textInputStyle={[styles.formInput, { right: '100%', width: '100%', }]}
                                    countryPickerButtonStyle={{ backgroundColor: Colors.white, }}
                                    // textContainerStyle={{ paddingVertical: 0 }}
                                    onChangeFormattedText={(text) => {
                                        setFormattedValue(text);
                                    }}
                                />

                            </HStack>}
                        />
                        <FormErrorText optionalStyle={{ marginLeft: '-30%' }} errorText={state.mobileError} />
                        {/* onPress={() => navigation.navigate('OTP')}  */}
                        <Pressable onPress={() => login()} style={{ alignSelf: 'flex-end' }}>
                            <View style={{ backgroundColor: Colors.primaryColor, borderRadius: 45 / 2, height: 45, width: 45, justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                <Image source={require('../assets/Images/arrow-top-left.png')} style={{ height: 25, width: 25, tintColor: Colors.white, transform: [{ rotate: '135deg' }], }} />
                            </View>
                        </Pressable>

                    </View>
                    <HStack alignItems={'center'} mt={'8'} w={'full'}>
                        <Divider>  <View style={{ height: 25, width: 45, borderRadius: 30 / 3, backgroundColor: Colors.grey2, zIndex: 1, marginTop: '-3%', alignSelf: 'center' }}>
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

    },

    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    imageStyle: {
        width: 24,
        height: 24,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})