import React, { useEffect, useState } from 'react'
import { SafeAreaView, Button, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { Text, View } from 'react-native'
import BookList from '../components/BookList'
import { getAllBooks, getAllGenres } from '../database/db'


const HomeScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [bookList, setBookList] = useState([])
    const [genreList, setGenreList] = useState([])

    useEffect(() => {
        if (navigation.isFocused()) {
            fetchData()
        }
    }, [navigation.isFocused()])
    
    const fetchData = async () => {
        const books = await getAllBooks()
        const genres = await getAllGenres()
        setBookList(books)
        setGenreList(genres)
        setIsLoading(false)
    }

    return(
        <SafeAreaView style={Styles.containerDark}>
            {
                !isLoading ?
                <Text style={Styles.textDark}>
                    You have {bookList.length} books!
                </Text>
                : <Text></Text>
            }
            {
                isLoading ? 
                <Text style={Styles.textDark}>Loading books...</Text> : 
                 <BookList books={bookList} genres={genreList}/>
            }
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        backgroundColor: '#121212',
    },

    textDark: {
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
})
export default HomeScreen