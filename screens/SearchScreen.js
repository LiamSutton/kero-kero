import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import BookList from '../components/BookList';
import { getAllBooks, getAllGenres, searchBooksByTitle } from '../database/db';
import { NavigationContainer } from '@react-navigation/native';

const SearchScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [masterBookList, setMasterBookList] = useState([])
    const [bookList, setBookList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [searchBy, setSearchBy] = useState(null)
    useEffect(() => {
        if (navigation.isFocused()) {
            fetchData()
        }
    }, [navigation.isFocused()])


    const fetchData = async () => {
        const books = await getAllBooks()
        const genres = await getAllGenres()

        setMasterBookList(books)
        setBookList(books)
        setGenreList(genres)
        setIsLoading(false)
    }

    const searchByTitle = (text) => {
        setSearchBy(text)
        const books = masterBookList.filter((book) => {
            return book.title.toLowerCase().includes(text.toLowerCase())
        })
        setBookList(books)
    }
    return (
        <SafeAreaView style={Styles.containerDark}>
            <View>
            <TextInput
               style={Styles.textInputDark}
               onChangeText={(text) => {
                   searchByTitle(text)
               }}
               >

               </TextInput>
            </View>
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
        alignItems: 'flex-start',
        backgroundColor: '#121212',
    },

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textInputDark: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
        backgroundColor: '#181818'
    },
})

export default SearchScreen;