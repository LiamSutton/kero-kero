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
                <Text style={Styles.textDark}>{bookInfo.title}</Text>
                <Text style={Styles.textDark}>{bookInfo.author}</Text>
                <Text style={Styles.textDark}>{bookInfo.genre}</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    textDark: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    bookContainer: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'gray'
    },
    
    bookTextContainer: {
        marginLeft: 10,

    },

    bookThumbmail: {
        height: 150,
        width: 100,
        marginLeft: 100,

    },
})
export default Book