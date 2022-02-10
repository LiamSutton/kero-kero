import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'
import BookList from '../components/BookList';
import { getAllBooks, getAllGenres, searchBooksByTitle } from '../database/db';
const SearchScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [masterBookList, setMasterBookList] = useState([])
    const [bookList, setBookList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [filterBy, setFilterBy] = useState('title')
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

    const filterBookList = (text) => {
        let books = null
        if (filterBy == 'title') {
            books = filterByTitle(text)
        }
        if (filterBy == 'author') {
            books = filterByAuthor(text)
        }
        if (filterBy == 'genre') {
           books = filterByGenre(text)
        }

        setBookList(books)
    }

    const filterByTitle = (text) => {
        text = text.trim()
        const books = masterBookList.filter((book) => {
            return book.title.toLowerCase().includes(text.toLowerCase())
        })
       
        return books
    }

    const filterByAuthor = (text) => {
        const books = masterBookList.filter((book) => {
            return book.author.toLowerCase().includes(text.toLowerCase())
        })

        return books
    }

    const filterByGenre = (text) => {
        const books = masterBookList.filter((book) => {
            return book.genre.toLowerCase().includes(text.toLowerCase())
        })

        return books
    }
    return (
        <SafeAreaView style={Styles.containerDark}>
            <View style={Styles.searchContainer}>
                <TextInput
                    style={Styles.textInputDark}
                    onChangeText={(text) => {
                        filterBookList(text)
                    }}
                >
                </TextInput>
                <View style={Styles.genrePickerContainer}>
                <Picker
                    dropdownIconColor={'#FFFFFF'}
                    style={Styles.genrePicker}
                        selectedValue={filterBy}
                        onValueChange={(itemValue, itemIndex) =>
                            setFilterBy(itemValue)
                        }>
                        <Picker.Item label="Title" value="title" />
                        <Picker.Item label="Author" value="author"/>
                        <Picker.Item label="Genre" value="genre"/>
                </Picker>
                </View>
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
        flexDirection: 'column',
        backgroundColor: '#121212',
    },

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textInputDark: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
        backgroundColor: '#212121',
    },

    genrePickerContainer: {
        backgroundColor: '#212121',
        borderWidth: 1,
        marginLeft: 12,
        marginRight: 12,
    },

    genrePicker: {
        color: 'white',
        height: 40,
        marginLeft: 12,
        marginRight: 12,
        borderWidth: 1,
    },

    genrePickerItem: {
    },
})

export default SearchScreen;