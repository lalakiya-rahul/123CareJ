import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
    buttonPrimary: {
        backgroundColor: Colors.secondaryPrimaryColor,
        alignSelf: 'center',

    },
    buttonPrimaryText: {
        fontFamily: fonts.Poppins_SemiBold,
        color: Colors.white,
        fontSize: 16,
        textAlign: 'center'

    },
})