import React from "react";
import { Button, HStack, Text } from "native-base";
import styles from "./styles";
import PropTypes from 'prop-types';

const CommonButton = (props) => {
    const { label, optionalStyle, optionalTextStyle } = props;
    return (
        <Button
            width={'3xs'}
            rounded={"3xl"}
            style={[styles.buttonPrimary, optionalStyle]}
            {...props}
        >
            <Text
                alignSelf={'center'}
                uppercase
                style={[styles.buttonPrimaryText, optionalTextStyle,]}
            >{label}</Text>

        </Button>
    )
}


CommonButton.propTypes = {
    label: PropTypes.any,
    optionalStyle: PropTypes.any,
    optionalTextStyle: PropTypes.any
}

export default CommonButton