import { HStack, Image, Input, ScrollView, VStack } from 'native-base';
import * as React from 'react';
import { Dimensions, FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import NoData from '../components/NoData';
import Colors from '../constants/colors';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';

export default function Serach({ navigation }) {

    //serach screen

    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height

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
    return (
        <View style={{ backgroundColor: Colors.white, height: height, width: width, }}>
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

            <View style={{ padding: 8 }}>
                <HStack style={[Styles.titleHeaderView, { marginBottom: 8, }]}>
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
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}>


                <FlatList
                    contentContainerStyle={{ paddingBottom: '50%', }}
                    data={data}
                    ListEmptyComponent={<NoData />}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ backgroundColor: Colors.white, padding: 5, }}>
                                <Pressable onPress={() => navigation.navigate("ProductDetails")}>
                                    <HStack style={[styles.card,
                                    {
                                        backgroundColor: Colors.white,
                                        borderRadius: 10,
                                        justifyContent: 'space-between', padding: 5,
                                    }]}>
                                        <HStack space={3} justifyContent={'space-between'} >
                                            <VStack justifyContent={'center'} alignItems={'center'}>
                                                <Image style={{
                                                    width: 110,
                                                    height: 110,
                                                    resizeMode: 'cover'
                                                }} borderRadius={'sm'} source={{
                                                    uri: item.image
                                                }} alt="Alternate Text" size="md" />

                                            </VStack>

                                            <VStack w={'64'}>
                                                <HStack justifyContent={'space-between'}>
                                                    <Text style={[Styles.titleText, { marginTop: '3%', color: Colors.black }]}>{item.title}</Text>
                                                    <Image style={{
                                                        width: 28,
                                                        height: 28,
                                                        resizeMode: 'cover',


                                                    }} source={require('../assets/Images/10.jpg')} alt="Alternate Text" size="md"></Image>
                                                </HStack>
                                                <HStack h={'5'} alignItems={'center'} >
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


                                                <HStack alignItems={'center'} space={1} mt={'3'}>
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
            </ScrollView>
        </View>
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

