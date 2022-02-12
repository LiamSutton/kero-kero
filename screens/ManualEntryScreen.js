import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { View } from 'react-native'

const ManualEntryScreen = ({ navigation }) => {
    const [manualIsbn, setManualIsbn] = useState('')

    const submitIsbn = () => {
        navigation.navigate("New Book", {
            isbn: manualIsbn
        })
    }

    const addBookWithoutIsbn = () => {
        navigation.navigate("Manual New Book")
    }

    return (
        <View style={Stlyes.containerDark}>
            <Text style={Stlyes.textDark}>Enter ISBN</Text>
            <TextInput
                keyboardType={'numeric'}
                style={Stlyes.textInputDark}
                onChangeText={(text) => setManualIsbn(text)}
            >
            </TextInput>
            <TouchableOpacity style={Stlyes.submitButton} onPress={submitIsbn}>
                <Text style={{ textAlignVertical: 'center', color: 'white', textAlign: 'center' }}>Submit ISBN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Stlyes.addBookWIthoutIsbnButton} onPress={addBookWithoutIsbn}>
                <Text style={{ textAlignVertical: 'center', color: 'white', textAlign: 'center' }}>Manually add book without ISBN</Text>
            </TouchableOpacity>
        </View>
    )
}


const Stlyes = StyleSheet.create({
    containerDark: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    textInputDark: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
        backgroundColor: '#181818'
    },

    textDark: {
        paddingTop: 15,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    submitButton: {
        width: 150,
        minHeight: 40,
        backgroundColor: '#01579b',
        borderRadius: 15,
        marginTop: 20,
        marginLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'center',
    },
    addBookWIthoutIsbnButton: {
        width: 150,
        minHeight: 40,
        backgroundColor: '#01579b',
        borderRadius: 15,
        marginTop: 20,
        marginLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'center',
    },
})
export default ManualEntryScreen