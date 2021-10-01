import React from 'react'
import { SafeAreaView, Text, TouchableOpacity} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet } from 'react-native'

const NewBookScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.containerDark}>
            <Text style={Styles.textDark}>
                Hello from the New Book Screen!
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search Screen")} style={Styles.touchableButton}>
                <Text style={Styles.textDark}>
                    Scan <Ionicons name="camera" color="white" size={25}/>
                </Text>
            </TouchableOpacity>
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
    },

    touchableButton: {
        backgroundColor: '#01579b',
        borderRadius: 100,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
    
})

const NavigateToHome = () => {
    navigation.navigate("Home")
}
export default NewBookScreen