import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'

const NewBookScreen = () => {
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

export default NewBookScreen