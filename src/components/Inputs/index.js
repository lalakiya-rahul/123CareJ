import React from "react";
import { HStack, Input, } from "native-base";
import styles from "./styles";
import fonts from "../../constants/fonts";
import Colors from "../../constants/colors";
import PropTypes from 'prop-types';

const CommonInput = (props) => {
    const { inputOptionalStyle, optionalStyle } = props;
    return (
        <HStack pt={'2.5'} style={optionalStyle}>
            <Input
                height={"5/6"}
                w={"100%"}
                borderWidth={0}
                style={[styles.formInput, inputOptionalStyle]}
                autoCapitalize={"none"}
                keyboardType={"default"}
                fontFamily={fonts.Poppins_Medium}
                variant={"rounded"}
                fontSize={'md'}
                placeholderTextColor={Colors.grey}
                {...props}
            >
            </Input>
        </HStack>
    )
}

CommonInput.propTypes = {
    inputOptionalStyle: PropTypes.any,
    optionalStyle: PropTypes.any
}

export default CommonInput