import React from 'react'
import { Box, Button, HStack, Icon, Image, Text } from "native-base";
import Colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import PropTypes from 'prop-types';
import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { create } from 'react-test-renderer';

const countries = [
    { title: 'India', image: require('../../assets/Images/india.png') },
    { title: 'UAE', image: require('../../assets/Images/india.png') },
]

const CommonHeader = (props, navigation) => {
    const { LeftText, backIcon, onPress, titleText, drawer, drawerOnPress, logoPress } = props
    return (
        backIcon ?
            <HStack bg={Colors.primaryColor} alignItems="center" p={2} justifyContent={'space-between'} >
                <HStack alignItems={'center'} space={'4'}>
                    <Pressable onPress={onPress}>
                        <Image size={7} tintColor={Colors.white}
                            alt={"Alternate Text"}
                            source={require('../../assets/Images/back.png')} />
                    </Pressable>
                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 13, color: Colors.white, }}>{titleText}</Text>
                </HStack>
                <HStack alignSelf={'center'} alignItems={'center'}>
                    <Image mr={'1'}
                        style={{ height: 14, width: 10, tintColor: 'white' }}
                        alt={"Alternate Text"}
                        source={require('../../assets/Images/location2.png')} />
                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 9, color: Colors.white }}>Ahmedabad</Text>
                </HStack>
            </HStack>
            :
            <HStack bg={Colors.primaryColor} alignItems="center" p={2} justifyContent={'space-between'}>
                <HStack alignItems={'center'}>
                    {drawer ?
                        <Pressable onPress={drawerOnPress}>
                            <Image ml={'2'} size={7}
                                alt={"Alternate Text"}
                                source={require('../../assets/Images/drawer.png')} />
                        </Pressable>
                        : null
                    }
                    <Pressable onPress={logoPress}>
                        <Image ml={drawer ? '5' : '0'} style={{ height: 22, width: 70 }} tintColor={Colors.white}
                            alt={"Alternate Text"}
                            source={{ uri: 'https://www.123care.one/storage/app/logo/thumb-500x100-logo-60b5fc0272000.png' }} />
                    </Pressable>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <Image mr={'1'}
                        style={{ height: 14, width: 10, tintColor: 'white' }}
                        alt={"Alternate Text"}
                        source={require('../../assets/Images/location2.png')} />
                    <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 9, color: Colors.white }}>Ahmedabad</Text>
                </HStack>
            </HStack>
    )
}

CommonHeader.propTypes = {
    LeftText: PropTypes.any,
    backIcon: PropTypes.any,
    onPress: PropTypes.any,
    titleText: PropTypes.any,
    onPressforDrawer: PropTypes.any,
    drawer: PropTypes.any,
    drawerOnPress: PropTypes.any,
    logoPress: PropTypes.any,
}

const styles = StyleSheet.create({
    dropdown3BtnStyle: {
        width: '37%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        left: 6
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    dropdown3BtnImage: {
        width: 40, height: 40, resizeMode: 'cover',
    },
    dropdown3BtnTxt: {
        color: '#444',
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 1,
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingHorizontal: -2,
    },
    dropdown3RowTxt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 5,
    }
})


export default CommonHeader;

 // <HStack style={{ alignItems: 'center', justifyContent: 'space-around', }} >

                //     <SelectDropdown
                //         buttonStyle={styles.dropdown3BtnStyle}
                //         renderCustomizedButtonChild={(selectedItem, index) => {
                //             return (
                //                 <View style={styles.dropdown3BtnChildStyle}>
                //                     {selectedItem ? (
                //                         <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />
                //                     ) : (
                //                         <Image source={require('../../assets/Images/india.png')} style={styles.dropdown3BtnImage} />
                //                     )}
                //                     <Text style={styles.dropdown3BtnTxt}>{'▼'}</Text>
                //                 </View>
                //             );
                //         }}
                //         renderCustomizedRowChild={(item, index) => {
                //             return (
                //                 <View style={styles.dropdown3RowChildStyle}>
                //                     <Image source={item.image} style={{ width: 45, height: 45, resizeMode: 'cover' }} />
                //                     <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
                //                 </View>
                //             );
                //         }}
                //         buttonTextStyle={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.smallText }}
                //         data={countries}
                //         onSelect={(selectedItem, index) => {
                //             console.log(selectedItem, index)
                //         }}
                //     />
                // </HStack>
