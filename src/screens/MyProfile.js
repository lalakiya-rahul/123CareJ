import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import { Avatar, Box, Checkbox, CheckCircleIcon, Divider, HStack, Image, Input, Select, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import PhoneInput from 'react-native-phone-number-input';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function MyProfile({ navigation }) {
    const [service, setService] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const phoneInput = React.useRef(null);
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

                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </HStack>
                </HStack>
            </HStack>
            <ScrollView style={{ marginBottom: '10%' }}>
                <View style={{ padding: 15, backgroundColor: Colors.white, }}>
                    <HStack  >
                        <Image
                            size={110} borderRadius={100}
                            alt="Alternate Text"
                            source={{ uri: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg' }} />
                        <VStack ml={'8'} alignSelf="flex-start" mt={'7'} >
                            <Text style={Styles.titleText}>Richa Patel</Text>
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
                                placeholder="Name" />
                        </Box>

                        <Box mt={'4'}>
                            <Input fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'}
                                borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'}
                                minWidth="full"
                                placeholder="Username" />
                        </Box>

                        <Box mt={'4'}>
                            <Input fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'}
                                borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'}
                                minWidth="full"
                                placeholder="Email" />
                        </Box>

                        <Box mt={'4'}>
                            <Input height={"12"} w={'full'} fontFamily={fonts.Poppins_SemiBold}
                                borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor}
                                rounded={'full'} placeholder="Enter your mobile no"
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

                        <CommonButton
                            mt={'3'}
                            label={"Update"}
                        />

                    </VStack>

                    <Text style={[Styles.titleText, { marginTop: '2%' }]}>Settings</Text>
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

                    </VStack>

                </View>
            </ScrollView>
        </View>
    );
}