import { Divider, HStack, Image, Input, ScrollView, VStack } from 'native-base';
import * as React from 'react';
import { Dimensions, FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';

export default function Message({ navigation }) {

    //serach screen

    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height

    const data = [
        {
            'id': 1,
            'name': 'Lon C. Nakamura',
            'msg': 'Hi',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
            'time': '22:01'
        },
        {
            'id': 2,
            'name': 'Charles L. Leathers',
            'msg': 'No sir',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'time': '21:03'
        },
        {
            'id': 3,
            'name': 'Donnie C. Griffin',
            'msg': 'Ok',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'time': '20:21'
        },
        {
            'id': 4,
            'name': 'Benjamin F. Hurst',
            'msg': 'Thats fine',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
            'time': '03:01'
        },
        {
            'id': 5,
            'name': 'Ann C. Cavin',
            'msg': 'Its a very nice',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'time': '07:34'
        },
        {
            'id': 6,
            'name': 'Anna T. Lopez',
            'msg': 'Yes, I am good',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
            'time': '09:06'
        },
        {
            'id': 7,
            'name': 'Debra J. McHugh',
            'msg': 'Yes, I am on the way',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'time': '13:45'
        },
        {
            'id': 8,
            'name': 'William M. Lemay',
            'msg': 'Yeah, sure',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'time': '08:32'
        },
        {
            'id': 9,
            'name': 'Edward M. Broom',
            'msg': 'Can we connect',
            'image': "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
            'time': '22:01'
        },
        {
            'id': 10,
            'name': 'Benjamin F. Hurst',
            'msg': 'Not at moment',
            'image': "https://www.123care.one/storage/files/in/3885/thumb-816x460-a3aae6e8ec147a3ddf2ed3679be05ca1.jpg",
            'time': '22:01'
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
                        <Image style={{ height: 22, width: 18 }} mr={'2'} ml={'2'}
                            alt={"Alternate Text"}
                            source={require('../assets/Images/notification.png')} />
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
            {/* <ScrollView contentContainerStyle={{ flexGrow: 1, }}> */}
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={{ padding: 8, }}>
                            <Pressable onPress={() => navigation.navigate('ChatDetails', { title: item.name })}>
                                <HStack style={{ justifyContent: 'space-between', alignContent: 'center', marginTop: '-2%' }}>
                                    <HStack >
                                        <Image style={{ height: 40, width: 40 }}
                                            alt={"Alternate Text"}
                                            rounded={'full'}
                                            source={{ uri: item.image }} />
                                        <VStack ml={'4'}>
                                            <Text style={{ fontSize: 14, color: Colors.black, fontFamily: fonts.Poppins_Bold, }}>{item.name}</Text>
                                            <Text style={{ fontSize: 10, color: Colors.grey, fontFamily: fonts.Poppins_Bold, }}>{item.msg}</Text>
                                        </VStack>
                                    </HStack>
                                    <VStack>
                                        <Text numberOfLines={1} style={{ fontFamily: fonts.Poppins_Medium, fontSize: 10, color: Colors.grey, marginTop: '2%', alignSelf: 'flex-end' }}>{item.time}</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>
                            <Divider mt={'2'} />
                        </View>
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
            />


            {/* </ScrollView> */}
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

    }
});

