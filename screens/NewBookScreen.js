import React, { useState, useEffect} from 'react'
import { SafeAreaView, Text, Image, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet } from 'react-native'

const NewBookScreen = ({ route, navigation}) => {
    const { isbn } = route.params
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false))
    }, []);
    return(
        <SafeAreaView style={Styles.containerDark}>
            {
                isLoading ? <Text>Loading...</Text> :
                <View style={Styles.containerDark}>
                    <Text style={Styles.textDark}>
                        Title: {data.items[0].volumeInfo.title}
                    </Text>
                    <Text style={Styles.textDark}>
                        Author: {data.items[0].volumeInfo.authors}
                    </Text>
                    <Text style={Styles.textDark}>
                        Date Published: {data.items[0].volumeInfo.publishedDate}
                    </Text>
                    <Image style={Styles.bookThumbnail} source={{uri: data.items[0].volumeInfo.imageLinks.thumbnail}}>
                    </Image>
                </View>
            }
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

    bookThumbnail: {
        marginTop: 20,
        height: 200,
        width: 100,
    },
    
})

const NavigateToHome = () => {
    navigation.navigate("Home")
}
export default NewBookScreen