import { Text } from 'native-base';
import React from 'react';
import PropsTypes from 'prop-types';
import fonts from '../../constants/fonts';
import Colors from '../../constants/colors';

export default function FromErrorText(props) {
    const { errorText, optionalStyle } = props;

    if (errorText) {
        return (
            <Text numberOfLines={1} mt={'2.5'} style={{ fontFamily: fonts.Poppins_SemiBold, fontSize: 14, color: Colors.error }}>{errorText}</Text>
        )
    }
    return null;
}

FromErrorText.propsTypes = {
    errorText: PropsTypes.any,
}