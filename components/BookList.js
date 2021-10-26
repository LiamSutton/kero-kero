import React from 'react'
import { Text } from 'react-native'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import Book from './Book'

const BookList = (props) => {
    const books = props.books
    return(
        <View style={Styles.container}>
            <FlatList 
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <Book bookInfo={item}/>}
            />
        </View>
    )
}
const Styles = StyleSheet.create({
    textDark: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    },

    container: {
        marginTop: 20,
        marginBottom: 20,
    }
})
export default BookList