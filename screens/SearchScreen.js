import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'
import BookList from '../components/BookList';
import { getAllBooks, getAllGenres } from '../database/db';
const SearchScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [masterBookList, setMasterBookList] = useState([])
    const [bookList, setBookList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [searchText, setSearchText] = useState('')
    const [filterBy, setFilterBy] = useState('title')
    const [hasRead, setHasRead] = useState('any')

    useEffect(() => {
        if (navigation.isFocused()) {
            fetchData()
        }
    }, [navigation.isFocused()])

    useEffect(() => {
        filterBookList()
    }, [searchText, filterBy, hasRead])

    const fetchData = async () => {
        const books = await getAllBooks()
        const genres = await getAllGenres()

        setMasterBookList(books)
        setBookList(books)
        setGenreList(genres)
        setIsLoading(false)
    }

    const filterBookList = () => {
        
        let books = null

        if (filterBy == 'title') {
            books = filterByTitle(searchText)
        }
        if (filterBy == 'author') {
            books = filterByAuthor(searchText)
        }
        if (filterBy == 'genre') {
           books = filterByGenre(searchText)
        }

        if (hasRead == 'any') {
            // no filtering required as no point in trying to filter true or false for a boolean state
        }
        if (hasRead == 'read') {
            books = books.filter((book) => {
                return book.hasRead == true
            })
        }
        if (hasRead == 'unread') {
            books = books.filter((book) => {
                return book.hasRead == false
            })
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
                    onChangeText={e => {setSearchText(e)}}
                >
                </TextInput>
                <View style={Styles.genrePickerContainer}>
                <Picker
                    dropdownIconColor={'#FFFFFF'}
                    style={Styles.genrePicker}
                        selectedValue={filterBy}
                        onValueChange={e => {setFilterBy(e)}}>
                        <Picker.Item label="Title" value="title" />
                        <Picker.Item label="Author" value="author"/>
                        <Picker.Item label="Genre" value="genre"/>
                </Picker>
                </View>

                <View style={Styles.genrePickerContainer}>
                <Picker
                    dropdownIconColor={'#FFFFFF'}
                    style={Styles.genrePicker}
                        selectedValue={hasRead}
                        onValueChange={e => {setHasRead(e)}}>
                        <Picker.Item label="Any" value="any" />
                        <Picker.Item label="Read" value="read"/>
                        <Picker.Item label="Unread" value="unread"/>
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
        margin: 12,
        marginTop: 5,
        marginBottom: 0,
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