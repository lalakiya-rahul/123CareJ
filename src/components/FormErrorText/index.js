import { Text } from 'native-base';
import React from 'react';
import PropsTypes from 'prop-types';
import fonts from '../../constants/fonts';
import Colors from '../../constants/colors';

export default function FromErrorText(props) {
    const { errorText, optionalStyle } = props;

    if (errorText) {
        return (
            <Text numberOfLines={1} style={[{ fontFamily: fonts.Poppins_SemiBold, fontSize: 10, color: Colors.error, }, optionalStyle]}>{errorText}</Text>
        )
    }
    return null;
}

FromErrorText.propsTypes = {
    errorText: PropsTypes.any,
    optionalStyle: PropsTypes.any
}