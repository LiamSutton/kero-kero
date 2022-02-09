import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import BookList from '../components/BookList';
import { getAllBooks, getAllGenres } from '../database/db';
import { NavigationContainer } from '@react-navigation/native';

const SearchScreen = ({navigation}) => {

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
    return (
        <SafeAreaView style={Styles.containerDark}>
        {
            isLoading ?
            <Text style={Styles.textDark}>Loading books...</Text> :
            <BookList books={bookList} genres={genreList} />
        }
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#121212',
    },

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default SearchScreen;