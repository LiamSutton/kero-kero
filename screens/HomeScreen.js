import React from 'react'
import { SafeAreaView, Button, StyleSheet } from 'react-native'
import { Text, View } from 'react-native'

const HomeScreen = () => {
    return(
        <SafeAreaView style={Styles.containerDark}>
            <Text style={Styles.textDark}>
                Hello from the Home screen!
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
export default HomeScreen