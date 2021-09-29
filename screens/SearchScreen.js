import React from 'react';
import { StyleSheet } from 'react-native';
import {View, Text, SafeAreaView} from 'react-native';
const SearchScreen = () => {
    return(
        <SafeAreaView style={Styles.containerDark}>
            <Text style={Styles.textDark}>
                Hello from the New Book Screen!
            </Text>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    },

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default SearchScreen;