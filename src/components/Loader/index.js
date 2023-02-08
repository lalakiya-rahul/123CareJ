import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../../constants/colors';

const Loader = ({ loading }) => {
    if (!loading) {
        return null;
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.white} />
        </View>
    );
};

export default Loader;

Loader.defaultProps = {
    loading: false,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        zIndex: 50,
    },
});
