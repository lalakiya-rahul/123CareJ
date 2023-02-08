import React from 'react';
import { Container, HStack, Image, Text } from 'native-base';
import fonts from '../../constants/fonts';
import Colors from '../../constants/colors';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CommonChip = (props) => {
    const { source, label, size, cardStyle, labelStyle, imageStyle } = props
    return (
        <HStack style={[styles.card, { paddingVertical: 5, paddingHorizontal: '7%' }, cardStyle]} rounded={'full'} justifyContent={'center'} alignItems={'center'}>
            <Text style={[styles.lableText, labelStyle]}>{label}</Text>
            <Image ml={1} size={size} style={[styles.imageStyle, imageStyle]}
                alt={"Alternate Text"}
                source={source} />
        </HStack >
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderColor: Colors.chipColor,
        borderWidth: 1
    },
    lableText: {
        fontFamily: fonts.Poppins_Medium,
        fontSize: 12,
        color: Colors.black,
        textAlign: 'center'
    },
    imageStyle: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    }
});

CommonChip.propTypes = {
    cardStyle: PropTypes.any,
    source: PropTypes.any,
    label: PropTypes.any,
    size: PropTypes.any,
    labelStyle: PropTypes.any,
    imageStyle: PropTypes.any
}

export default CommonChip;