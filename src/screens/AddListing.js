import * as React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/colors';
import { Box, Checkbox, CheckCircleIcon, CheckIcon, HStack, Icon, Image, Input, Select, TextArea, VStack } from 'native-base';
import fonts from '../constants/fonts';
import CommonInput from '../components/Inputs';
import PhoneInput from 'react-native-phone-number-input';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';

export default function AddListing({ navigation }) {
    const [service, setService] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const phoneInput = React.useRef(null);
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
                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </VStack>
                </HStack>
            </HStack>

            <ScrollView >
                <View style={{ flex: 1, backgroundColor: Colors.white, padding: 15, marginTop: '-3%' }}>
                    <View style={[styles.cardView, { marginTop: '1%' }]}>
                        <HStack justifyContent={'center'} alignContent={'center'} style={[styles.card, { backgroundColor: Colors.secondaryPrimaryColor, borderBottomRightRadius: 1, borderBottomLeftRadius: 1, width: '100%' }]}>
                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 18, color: Colors.white, textAlign: 'center' }}>
                                Post Free Ads
                            </Text>
                        </HStack>
                        <VStack p={'3'} h={'80'} borderBottomLeftRadius={'3xl'} borderBottomRightRadius={'3xl'} style={{ backgroundColor: '#FFF' }}>
                            <HStack style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black, }}>
                                    Category
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300">
                                    <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={service}
                                        minWidth="250" accessibilityLabel="Select Categories" placeholder="Select Categories" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckCircleIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item label="UX Research" value="ux" />
                                        <Select.Item label="Web Development" value="web" />
                                        <Select.Item label="Cross Platform Development" value="cross" />
                                        <Select.Item label="UI Designing" value="ui" />
                                        <Select.Item label="Backend Development" value="backend" />
                                    </Select>
                                </Box>
                            </HStack>

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Title
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} rounded={'full'} minWidth="250" placeholder="Add Title" />
                                </Box>
                            </HStack>

                            <VStack mt={'1'}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Description
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="500">
                                    <TextArea fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'} borderRadius={'2xl'} borderColor={Colors.secondaryPrimaryColor} h={'32'}
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
                                        InputRightElement={<HStack zIndex={1} position={'absolute'} left={'70%'} alignSelf={'center'} justifyContent={"center"}
                                            h={'100%'}
                                            w={'20'}
                                            bg={Colors.primaryColor}>
                                            <Text style={{ alignSelf: 'center', fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.white }}>
                                                Upload
                                            </Text>
                                        </HStack>}
                                        minWidth="250" placeholder="Upload Pictures" />
                                </Box>
                            </HStack>
                            <HStack alignSelf={'flex-end'} w={'56'}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.smallText }}>
                                    Add up to 2 pictures. Use real pictures of your product, not catalogs.
                                </Text>
                            </HStack>
                            <HStack mt={'2'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Location
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300">
                                    <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={service}
                                        minWidth="250" accessibilityLabel="Select Location" placeholder="Select Location" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckCircleIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item label="UX Research" value="ux" />
                                        <Select.Item label="Web Development" value="web" />
                                        <Select.Item label="Cross Platform Development" value="cross" />
                                        <Select.Item label="UI Designing" value="ui" />
                                        <Select.Item label="Backend Development" value="backend" />
                                    </Select>
                                </Box>
                            </HStack>

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    City
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300">
                                    <Select fontFamily={fonts.Poppins_SemiBold} rounded={'full'} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} selectedValue={service}
                                        minWidth="250" accessibilityLabel="Select City" placeholder="Select City" _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckCircleIcon size="5" />
                                        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item label="UX Research" value="ux" />
                                        <Select.Item label="Web Development" value="web" />
                                        <Select.Item label="Cross Platform Development" value="cross" />
                                        <Select.Item label="UI Designing" value="ui" />
                                        <Select.Item label="Backend Development" value="backend" />
                                    </Select>
                                </Box>
                            </HStack>

                            <HStack mt={'4'} space={2} style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.black }}>
                                    Tags
                                    <Text style={{ color: Colors.error }}>⁕</Text>
                                </Text>
                                <Box maxW="300" >
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} rounded={'full'} minWidth="250" placeholder="Add Tags" />
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
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} rounded={'full'} minWidth="250" placeholder="Enter your name" />
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
                                    <Input fontFamily={fonts.Poppins_SemiBold} borderWidth={'2'} borderColor={Colors.secondaryPrimaryColor} rounded={'full'} minWidth="250" placeholder="Enter your mail address" />
                                </Box>
                            </HStack>

                            <VStack alignSelf={'center'} mt={'8'}>
                                <HStack alignSelf={'center'}>
                                    <Checkbox mr={'1.5'} isChecked size={'md'} colorScheme="green" />
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}>
                                        I have read and agree to the Terms & Conditions
                                    </Text>
                                </HStack>

                                <HStack alignSelf={'center'} mt={'2'}>
                                    <Checkbox mr={'1.5'} isChecked size={'md'} colorScheme="green" />
                                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 12, color: Colors.black }}>
                                        I accept to receive marketing emails
                                    </Text>
                                </HStack>

                                <CommonButton
                                    optionalStyle={{ backgroundColor: Colors.primaryColor }}
                                    mt={'5'}
                                    label={"Submit"}
                                />
                            </VStack>
                        </VStack>
                    </View>
                </View>
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
});