
import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { Divider, HStack, Input, VStack } from 'native-base';
import Colors from '../constants/colors'
import Fonts from '../constants/fonts'
import OTPTextInput from 'react-native-otp-textinput';
import { checkInternet } from '../helper/Utils';
import { Urls } from '../helper/Urls';
import Loader from '../components/Loader';
import { isEmpty } from 'lodash'
import { Helper } from '../helper/Helper';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


export default function OTP({ navigation, route }) {
    // const otpInput = React.useRef(null);
    const [otpInput, setOtpInput] = React.useState('')
    const [seconds, setSeconds] = React.useState(30);
    const [loading, setLoding] = React.useState(false);
    const setText = () => {
        otpInput.current.setValue("");
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const verifyOtp = async () => {
        if (checkInternet()) {
            setLoding(true);
            const apiData = {
                mobile_no: parseInt(route.params.phone),
                otp: otpInput
            };
            var response = await Helper.POST(Urls.verifyOtp, apiData);
            console.log(response, 'respo');
            if (response.error === '0') {
                navigation.navigate('BottomTab');
                setLoding(false);
            } else {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                setLoding(false);
            }
        } else {
            ToastAndroid.show(Urls.nointernet, ToastAndroid.SHORT);
        }
    };


    return (
        <ScrollView>
            <View style={[styles.container]}>
                <Loader loading={loading} />
                <VStack p={8}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} style={{ height: 70, width: 220, marginTop: 30 }} />
                        </View>
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, marginTop: 8 }}>
                            Login for a seamless experience
                        </Text>

                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, marginTop: 15, alignSelf: 'flex-start' }}>
                            Otp is sent on number
                        </Text>
                        <HStack space={3} style={{ alignSelf: 'flex-start', }}>
                            <Text style={{ fontFamily: Fonts.Poppins_Bold, color: Colors.grey, fontSize: 14, marginTop: 15, textAlign: 'center', alignSelf: 'center', }}>
                                {route.params.phone}
                            </Text>
                            {/* <Image style={{ height: 16, width: 16, tintColor: Colors.black, alignSelf: 'center', marginTop: '3%' }}
                                alt={"Alternate Text"}
                                source={require('../assets/Images/pen.png')} /> */}
                        </HStack>

                        <OTPTextInput
                            handleTextChange={(otp) => setOtpInput(otp)}
                            inputCount={4}
                            keyboardType="numeric"
                        />
                        {seconds === 0 ?
                            <HStack style={{ justifyContent: 'space-around', marginTop: 15, width: '100%' }}>
                                <Text style={{ fontFamily: Fonts.Poppins_Regular, color: Colors.grey, fontSize: 14, textAlign: 'center', alignSelf: 'center', }}>
                                    Didn't Receive the OTP?
                                </Text>

                                <Text style={{ fontFamily: Fonts.Poppins_Bold, color: Colors.primaryColor, fontSize: 14, textAlign: 'center', alignSelf: 'center', }}>
                                    Resend OTP
                                </Text>
                            </HStack>
                            : null}
                        {seconds === 0 ?
                            null :
                            <View style={{ backgroundColor: Colors.primaryColor, borderRadius: 45 / 2, height: 45, width: 45, justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                <Text style={{ fontFamily: Fonts.Poppins_Regular, color: Colors.white, fontSize: 15, textAlign: 'center', alignSelf: 'center', }}>
                                    {seconds}
                                </Text>
                            </View>

                        }

                        <Pressable onPress={() => verifyOtp()} style={{ alignSelf: 'flex-end' }}>
                            <View style={{ backgroundColor: Colors.primaryColor, borderRadius: 45 / 2, height: 45, width: 45, justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                <Image source={require('../assets/Images/arrow-top-left.png')} style={{ height: 25, width: 25, tintColor: Colors.white, transform: [{ rotate: '135deg' }], }} />
                            </View>
                        </Pressable>

                    </View>

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