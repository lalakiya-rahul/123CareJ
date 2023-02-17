
import React from 'react';
import { StyleSheet, View, FlatList, Dimensions, Pressable } from 'react-native';

import Colors from '../constants/colors';
import { Button, HStack, Image, Input, Text, VStack } from 'native-base';
import fonts from '../constants/fonts';
import CommonHeader from '../components/Header';
import CommonChip from '../components/Chip';
import SelectDropdown from 'react-native-select-dropdown'
import Styles from '../constants/styles';
import Modal from "react-native-modal";
import CommonButton from '../components/Button';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Product = ({ navigation, route }) => {
    console.log(route.params, 'params data');
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const [isModalVisible, setModalVisible] = React.useState(false);
    const data = [
        {
            'id': 1,
            'title': 'Test image',
            'name': 'John O’Furniture',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 2,
            'title': 'Test image',
            'name': 'Olive Yew',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 3,
            'title': 'Test image',
            'name': 'Aida Bugg',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 4,
            'title': 'Test image',
            'name': 'Peg Legge',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 5,
            'title': 'Test image',
            'name': 'Liz Erd',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 6,
            'title': 'Test image',
            'name': 'A. Mused',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 7,
            'title': 'Test image',
            'name': 'Ray O’Sun',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 8,
            'title': 'Test image',
            'name': 'Rita Book',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 9,
            'title': 'Test image',
            'name': 'Anne Teak',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 10,
            'title': 'Test image',
            'name': 'Anita Bath',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
    ]
    const data2 = [
        {
            'id': 1,
            'title': 'Narayana Multispeciality Hospital',
            'name': 'John O’Furniture',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 2,
            'title': 'SVP Hospital',
            'name': 'Olive Yew',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 3,
            'title': 'Sterling Hospital',
            'name': 'Aida Bugg',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 4,
            'title': 'Karnavati Hospital',
            'name': 'Peg Legge',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 5,
            'title': 'Long Life Hospital',
            'name': 'Liz Erd',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 6,
            'title': 'Zydus Hospitals Ahmedabad',
            'name': 'A. Mused',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 7,
            'title': 'Saviour Hospital',
            'name': 'Ray O’Sun',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 8,
            'title': 'VS General Hospital',
            'name': 'Rita Book',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 9,
            'title': 'Mansi Hospital',
            'name': 'Anne Teak',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
        {
            'id': 10,
            'title': 'Nidhi Multispeciality Hospital',
            'name': 'Anita Bath',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'dummyText': 'An oxygen cylinder is a storage container which supplies oxygen to a patient through a surgical mask over the nasal cannula.'
        },
    ]

    return (
        <View backgroundColor={Colors.white} style={{ height: height, width: width, }}>
            <HStack bg={Colors.white} p={2} alignItems={'center'} justifyContent={'space-between'} style={{ height: '5%', }} >
                <HStack alignItems={'center'} >
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={{ height: 30, width: 30 }}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/arrow_back.png')} />
                    </Pressable>
                    <Text style={[Styles.titleText, { color: Colors.black, marginLeft: '4%', fontFamily: fonts.Poppins_SemiBold, fontSize: 18 }]}>Interior decorators</Text>
                </HStack>

                <HStack alignSelf={'center'} alignItems={'center'}>
                    <HStack >
                        <Image style={{ height: 22, width: 22 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/share1.png')} />
                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
                    </HStack>
                </HStack>
            </HStack>
            <View style={{ padding: 8, marginTop: '-1%' }}>
                <HStack style={[styles.titleHeaderView, { marginBottom: 8, }]}>

                    <VStack w={'100%'} space={2} alignSelf="center" >
                        <Input h={'10'} placeholder="Search " fontFamily={fonts.Poppins_Medium}
                            variant="rounded" fontSize="12" rounded={'full'} borderColor={Colors.primaryColor}
                            InputLeftElement={<Image ml={'4'}
                                alt={"Alternate Text"} size={"4"}
                                source={require('../assets/Images/search.png')} />}
                            InputRightElement={<Image mr={'4'}
                                alt={"Alternate Text"} h={'5'} w={'4'}
                                source={require('../assets/Images/mic.png')} />} />
                    </VStack>
                </HStack>
                <View style={{ marginTop: '1%', marginBottom: '2%' }}>
                    <HStack alignItems={'center'} justifyContent={'space-between'} >
                        <CommonChip
                            label={"Sort: Newest"}
                            source={require('../assets/Images/sort.png')} />

                        <CommonChip
                            label={"Filter(3)"}
                            source={require('../assets/Images/filter.png')} />

                        <CommonChip
                            label={"Near Me"}
                            source={require('../assets/Images/pin1.png')} />
                    </HStack>
                </View>

                <FlatList
                    contentContainerStyle={{ paddingBottom: '50%', }}
                    data={route.params.isHospitalData === true ? data2 : data}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: Colors.white, padding: 5, }}>
                                <Pressable onPress={() => route.params.isHospitalData === true ? navigation.navigate("HospitalDetails") : navigation.navigate("ProductDetails")}>
                                    <HStack style={[styles.card,
                                    {
                                        backgroundColor: Colors.white,
                                        borderRadius: 10,
                                        justifyContent: 'space-between', padding: 5,
                                    }]}>
                                        <HStack space={3} justifyContent={'space-around'} >
                                            <VStack justifyContent={'center'} alignItems={'center'} >
                                                <Image style={{
                                                    width: 110,
                                                    height: 115,
                                                    resizeMode: 'center'
                                                }} borderRadius={'md'} source={{
                                                    uri: item.image
                                                }} alt="Alternate Text" size="md" />

                                            </VStack>

                                            <VStack w={'64'}>
                                                <HStack justifyContent={'space-between'} >
                                                    <Text numberOfLines={2} style={[Styles.titleText, { color: Colors.black, width: '80%', }]}>{item.title}</Text>
                                                    <Image style={{
                                                        width: 25,
                                                        height: 25,
                                                        resizeMode: 'cover',
                                                    }} source={item.id === 2 ? require('../assets/Images/fevoritesRed.png') : require('../assets/Images/10.jpg')} alt="Alternate Text" ></Image>

                                                </HStack>
                                                <HStack h={'5'} alignItems={'center'}  >
                                                    <Image style={{ height: 14, width: 14, marginLeft: '-1%' }}
                                                        alt={"Alternate Text"}
                                                        source={require('../assets/Images/pin1.png')} />
                                                    <Text style={[Styles.titleText, { fontSize: 9, color: Colors.grey }]}>Apple Sqaure, Surat, Gujarat</Text>
                                                </HStack>
                                                <HStack lineHeight={'2.5'} h={'4'} style={{ justifyContent: 'flex-start', alignItems: 'center', }}>
                                                    <Image style={{ height: 8, width: 40, marginLeft: '2%', tintColor: Colors.primaryColor }}
                                                        alt={"Alternate Text"}
                                                        source={require('../assets/Images/rating.png')} />
                                                    <Text style={[Styles.titleText, { fontSize: 7, color: Colors.ratingColor, fontFamily: fonts.Poppins_Medium, marginLeft: '2%', }]}>16 Ratings</Text>
                                                </HStack>


                                                <HStack alignItems={'flex-end'} justifyContent={'flex-end'} space={1} mt={'3'}>
                                                    <Image style={styles.imageIconSize}
                                                        alt={"Alternate Text"}
                                                        source={require('../assets/Images/call.png')} />
                                                    <Image ml={'4'} style={styles.imageIconSize}
                                                        alt={"Alternate Text"}
                                                        source={require('../assets/Images/gmail.png')} />
                                                    <Image ml={'4'} style={styles.imageIconSize}
                                                        alt={"Alternate Text"}
                                                        source={require('../assets/Images/greenWp.png')} />
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    </HStack>
                                </Pressable>
                            </View>
                        );
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View >
        </View >
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.secondaryPrimaryColor,
        borderRadius: 25,
        justifyContent: 'center',
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        position: 'relative',
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
    titleHeaderView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2
    },
    imageIconSize: {
        height: 33, width: 33,
    }
});

export default Product;

