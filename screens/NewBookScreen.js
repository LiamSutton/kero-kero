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
                     <Image style={Styles.bookThumbnail} source={{uri: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}}>
                    </Image>
                    <Text style={Styles.textDark}>
                        Title: {data.items[0].volumeInfo.title}
                    </Text>
                    <Text style={Styles.textDark}>
                        Author: {data.items[0].volumeInfo.authors}
                    </Text>
                    <Text style={Styles.textDark}>
                        Date Published: {data.items[0].volumeInfo.publishedDate}
                    </Text>
                </View>
            }
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        alignItems: 'center'
    },

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    bookThumbnail: {
        marginTop: 20,
        height: 350,
        width: 200,
        resizeMode: 'contain'
    },
    
})

const NavigateToHome = () => {
    navigation.navigate("Home")
}
export default NewBookScreen