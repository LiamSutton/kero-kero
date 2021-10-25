import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'

const Book = (props) => {
    const bookInfo = props.bookInfo
    return(
        <View>
            <Text style={Styles.textDark}>{bookInfo.title}</Text>
            <Text style={Styles.textDark}>{bookInfo.authorId}</Text>
            <Text style={Styles.textDark}>{bookInfo.genreId}</Text>
            <Image style={Styles.bookThumbmail} source={{uri: bookInfo.cover}}>

            </Image>
        </View>
    )
}

const Styles = StyleSheet.create({
    textDark: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },

    bookThumbmail: {
        height: 150,
        width: 100,
    },
})
export default Book