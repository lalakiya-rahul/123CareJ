import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList, Pressable, Dimensions } from 'react-native';

import Colors from '../constants/colors';
import { AlertDialog, Avatar, Box, Button, Checkbox, Divider, HStack, Image, Input, Select, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';
import CommonButton from '../components/Button';
import CommonHeader from '../components/Header';


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Fevorites({ navigation }) {
    const data = [
        {
            'id': 1,
            'title': 'Test image',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 2,
            'title': 'Test image1',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 3,
            'title': 'Test image2',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 4,
            'title': 'Test imag3',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 5,
            'title': 'Test imag4',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 6,
            'title': 'Test imag5',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 7,
            'title': 'Test imag6',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 8,
            'title': 'Test imag7',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
        {
            'id': 9,
            'title': 'Test imag8',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
        },
    ]
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    return (
        <View>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Fevorites</Text>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >

                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </HStack>
                </HStack>
            </HStack>
            <View style={{ backgroundColor: Colors.white, padding: 10, height: height, width: width }}>
                <HStack style={[styles.titleHeaderView, { marginBottom: 8, }]}>

                    <VStack w={'100%'} space={2} alignSelf="center" >
                        <Input h={'10'} placeholder="Search Fevorites" fontFamily={fonts.Poppins_Medium}
                            variant="rounded" fontSize="12" rounded={'full'} borderColor={Colors.primaryColor}
                            InputLeftElement={<Image ml={'4'}
                                alt={"Alternate Text"} size={"4"}
                                source={require('../assets/Images/search.png')} />}
                            InputRightElement={<Image mr={'4'}
                                alt={"Alternate Text"} h={'5'} w={'4'}
                                source={require('../assets/Images/mic.png')} />} />
                    </VStack>
                </HStack>
                <HStack mt={'2.5'}>
                    <Checkbox mr={'2.5'} value="test" accessibilityLabel="checkbox">
                        <Text style={[Styles.titleText, { fontSize: 12, }]}>Select All</Text>
                    </Checkbox>
                    <HStack style={[styles.boxStyle, { alignItems: 'center', justifyContent: 'space-between' }]} >
                        <Image source={(require('../assets/Images/delete.png'))} style={{ height: 16, width: 16, marginRight: 5, tintColor: 'white' }} />
                        <Text style={[Styles.titleText, { fontSize: 12, color: 'white' }]}>Delete</Text>
                    </HStack>
                </HStack>
                <FlatList
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <HStack style={[styles.card,
                            {
                                backgroundColor: Colors.white,
                                borderRadius: 10, borderWidth: 1,
                                justifyContent: 'space-between', padding: 10,
                                marginTop: 10, width: '100%'
                            }]}>
                                <HStack space={4}  >
                                    <HStack justifyContent={'center'} alignItems={'center'}>
                                        <Checkbox mr={'2.5'} value="test" accessibilityLabel="checkbox" />
                                        <Image style={{
                                            width: 80,
                                            height: 80,
                                            resizeMode: 'cover'
                                        }} borderRadius={'2xl'} source={{
                                            uri: item.image
                                        }} alt="Alternate Text" size="md" />
                                    </HStack>

                                    <VStack width={'72'} >
                                        <Text style={Styles.titleText}>{item.title}</Text>
                                        <HStack space={1} style={{ alignItems: 'center', justifyContent: 'flex-start', }}>
                                            <Image tintColor={Colors.grey}
                                                alt={"Alternate Text"}
                                                style={{ height: 10, width: 10 }}
                                                source={require('../assets/Images/time.png')} />
                                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>Nov 5th, 2022 at 13:48</Text>

                                            <Image tintColor={Colors.grey}
                                                alt={"Alternate Text"}
                                                style={{ height: 10, width: 10 }}
                                                source={require('../assets/Images/pin1.png')} />
                                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>Ahmedabad</Text>
                                        </HStack>

                                        <HStack space={1} style={{ alignItems: 'center', justifyContent: 'flex-start', marginTop: -8 }}>
                                            <Image style={{ height: 9, width: 12, tintColor: Colors.grey }}
                                                alt={"Alternate Text"}
                                                source={require('../assets/Images/eye.png')} />
                                            <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>42</Text>


                                            {/* <Text style={{ fontFamily: fonts.Poppins_Bold, fontSize: 8, color: Colors.grey, marginLeft: '40%' }}>₹</Text>
                                <Text style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 8, color: Colors.grey }}>--</Text> */}
                                        </HStack>
                                        <HStack space={2}>
                                            <View style={styles.boxStyle}>
                                                <Pressable onPress={() => navigation.navigate('AddListing')}>
                                                    <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Image source={(require('../assets/Images/edit.png'))} style={{ height: 15, width: 15, marginRight: 5, tintColor: 'white' }} />
                                                        <Text style={[Styles.titleText, { fontSize: 12, color: 'white' }]}>Edit</Text>
                                                    </HStack>
                                                </Pressable>
                                            </View>
                                            <View style={styles.boxStyle}>
                                                <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Image source={(require('../assets/Images/eye.png'))} style={{ height: 12, width: 17, marginRight: 5, tintColor: 'white' }} />
                                                    <Text style={[Styles.titleText, { fontSize: 12, color: 'white' }]}>Offline</Text>
                                                </HStack>
                                            </View>

                                            {/* <View style={styles.boxStyle}>
                                                <Pressable onPress={() => setIsOpen(!isOpen)}>
                                                    <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Image source={(require('../assets/Images/delete.png'))} style={{ height: 16, width: 16, marginRight: 5, tintColor: 'white' }} />
                                                        <Text style={[Styles.titleText, { fontSize: 12, color: 'white' }]}>Delete</Text>
                                                    </HStack>

                                                    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                                                        <AlertDialog.Content>
                                                            <AlertDialog.CloseButton />
                                                            <AlertDialog.Header>Delete Ads</AlertDialog.Header>
                                                            <AlertDialog.Body>
                                                                Are you sure you want to delete?
                                                            </AlertDialog.Body>
                                                            <AlertDialog.Footer>
                                                                <Button.Group space={2}>
                                                                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button colorScheme="danger" onPress={onClose}>
                                                                        Delete
                                                                    </Button>
                                                                </Button.Group>
                                                            </AlertDialog.Footer>
                                                        </AlertDialog.Content>
                                                    </AlertDialog>

                                                </Pressable>
                                            </View> */}
                                        </HStack>

                                    </VStack>
                                </HStack>


                            </HStack>
                        )
                    }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.secondaryPrimaryColor,
        borderColor: Colors.secondaryPrimaryColor,
        borderWidth: 3,
        borderRadius: 25,
        justifyContent: 'center',
        shadowColor: Colors.black,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: { width: 0, height: 2 },
        position: 'relative'
    },
    boxStyle: {
        backgroundColor: Colors.lightBlue,
        alignItems: 'center',
        borderRadius: 3,
        // borderColor: Colors.smallText,
        paddingHorizontal: 10,
    }
});
