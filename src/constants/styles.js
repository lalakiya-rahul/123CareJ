import { Dimensions, StyleSheet } from "react-native";
import Colors from "./colors";
import fonts from "./fonts";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
        height: height,
    },
    titleText: {
        fontFamily: fonts.Poppins_Regular,
        fontSize: 16,
        color: Colors.primaryColor
    },
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.secondaryPrimaryColor,
        width: '40%'
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    marginBottom: {
        marginBottom: '30%'
    }
})

export default Styles;