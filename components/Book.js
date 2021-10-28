import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'

const Book = (props) => {
    const bookInfo = props.bookInfo
    return(
         <View style={Styles.bookContainer}>
            <Image style={Styles.bookThumbmail} source={{uri: bookInfo.cover}} />
            <View style={Styles.bookTextContainer}>
                <Text style={Styles.titleTextDark}>{bookInfo.title}</Text>
                <Text style={Styles.textDark}>{bookInfo.author}</Text>
                <Text style={Styles.textDark}>{bookInfo.genre}</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    textDark: {
        color: 'white',
    },

    titleTextDark: {
     fontSize: 14,
     fontWeight: 'bold',
     color: 'white',
    },

    bookContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#212121'
    },
    
    bookTextContainer: {
        marginLeft: 15,
        flexShrink: 1,
    },

    bookThumbmail: {
        height: 150,
        width: 100,
    },
})
export default Book