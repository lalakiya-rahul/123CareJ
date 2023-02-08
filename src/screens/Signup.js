
import React, { useRef, useState } from 'react';
import { Dimensions, ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { HStack, VStack, Text, Image, Divider, ScrollView, Input } from 'native-base';
import Colors from '../constants/colors';
import Fonts from '../constants/fonts';
import CommonInput from '../components/Inputs';
import CommonButton from '../components/Button';
import PhoneInput from 'react-native-phone-number-input';
import Styles from '../constants/styles';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Signup({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef(null);
    return (
        <ScrollView>
            <View style={[styles.container]}>
                <VStack alignItems={'center'} p={8}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} alt={"signup"} style={{ height: 70, width: 220, marginTop: 30 }} />
                        </View>
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, marginTop: 8 }}>
                            Signup for a seamless experience
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

                        <Input size="xl" mt={'8'} variant="unstyled" p={0} placeholder="Email" placeholderTextColor={Colors.grey2} focusOutlineColor={Colors.white} borderWidth={0} borderBottomColor={Colors.grey2} borderBottomWidth={'1'} />
                        {/* <Input size="xl" mt={'8'} variant="unstyled" p={0} placeholder="Password" placeholderTextColor={Colors.grey2} focusOutlineColor={Colors.white} borderWidth={0} borderBottomColor={Colors.grey2} borderBottomWidth={'1'} /> */}


                        <Pressable onPress={() => navigation.navigate('BottomTab')} style={{ alignSelf: 'flex-end' }}>
                            <View style={{ backgroundColor: Colors.primaryColor, borderRadius: 45 / 2, height: 45, width: 45, justifyContent: 'center', alignItems: 'center', marginTop: 15, }}>
                                <Image alt={"signup"} source={require('../assets/Images/arrow-top-left.png')} style={{ height: 25, width: 25, tintColor: Colors.white, transform: [{ rotate: '135deg' }], }} />
                            </View>
                        </Pressable>

                    </View>
                    <HStack alignItems={'center'} mt={'8'} w={'full'}>
                        <Divider>  <View style={{ height: 20, width: 40, borderRadius: 30 / 3, backgroundColor: Colors.grey2, zIndex: 1, marginTop: '-3%', alignSelf: 'center' }}>
                            <Text style={{ color: '#F9F8F7', fontSize: 11, alignSelf: 'center', }}>OR</Text>
                        </View> </Divider>
                    </HStack>

                    <View style={{ flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 50 / 2, height: 50, borderColor: Colors.grey2, borderWidth: 0.5, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50, }}>
                        <Image alt={"signup"} source={require('../assets/Images/facebook2.png')} style={{ height: 23, width: 23, marginRight: 8 }} />
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, }}>
                            Continue with Facebook
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 50 / 2, height: 50, borderColor: Colors.grey2, borderWidth: 0.5, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
                        <Image alt={"signup"} source={require('../assets/Images/google.png')} style={{ height: 23, width: 23, marginRight: 8 }} />
                        <Text style={{ fontFamily: Fonts.Poppins_Light, color: Colors.grey, fontSize: 14, }}>
                            Continue with Google
                        </Text>
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