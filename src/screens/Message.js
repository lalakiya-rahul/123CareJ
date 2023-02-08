import { HStack, Image, Input, ScrollView, VStack } from 'native-base';
import * as React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import Colors from '../constants/colors';
import fonts from '../constants/fonts';
import Styles from '../constants/styles';

export default function Message({ navigation }) {

    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
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
            </ScrollView>
        </View>
    )
}

