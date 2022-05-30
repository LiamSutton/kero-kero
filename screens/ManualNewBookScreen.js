import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, Image, View, TouchableOpacity, Switch, TextInput, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NavigationContainer } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'
import Toast from 'react-native-root-toast'
import { getAllGenres, getAuthorByName, insertAuthor, insertBook,  } from '../database/db'
import dayjs from 'dayjs'

const ManualNewBookScreen = ({ navigation }) => {

    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthorName, setBookAuthorName] = useState('')
    const [genreList, setGenreList] = useState([])
    const [genre, setGenre] = useState(1)
    const [hasRead, setHasRead] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const toggleHasRead = () => setHasRead(!hasRead)

    const addBook = async () => {
        let book = await prepareBook()

        const bookId = await insertBook(book)

        let toast = Toast.show("Book added to your library. 🥳",
            { duration: Toast.durations.SHORT})
        
        navigation.navigate("Home")
    }

    const prepareBook = async () => {
        let authorId = await handleAuthor(bookAuthorName)
        const dateCreated = dayjs().format("YYYY-MM-DD")
        let uri = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'

        const title = encodeURIComponent(bookTitle) // URI safe string

        FileSystem.downloadAsync(
            uri,
            `${FileSystem.documentDirectory}${title}.png`
        ).then(({ uri }) => {
            console.log("Finished downloading to " + uri)
        }).catch(error => {
            console.error(error)
        })

        let book = {
            title: bookTitle,
            authorId: authorId,
            genreId: genre,
            isbn: '',
            datePublished: null,
            dateCreated: dateCreated,
            cover: `${FileSystem.documentDirectory}${title}.png`,
            hasRead: hasRead,
        }
        return book
    }

    const handleAuthor = async (authorName) => {
        let authorId = await getAuthorByName(authorName)
        if (authorId == null) {
            authorId = await insertAuthor(authorName)
        }
        return authorId
    }
    useEffect(() => {
        const setupScreen = async () => {
            const list = await getAllGenres()
            setGenreList(list)
            setIsLoading(false)
        }
         setupScreen()
    },  [])
    return (
        <View style={Styles.containerDark}>
            <SafeAreaView style={Styles.containerDark}>
                <View style={Styles.bookContainer}>
                    <Image
                        style={Styles.bookThumbnail}
                        source={{ uri: 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg' }}
                    />
                    <View style={Styles.bookTextContainer}>
                        <Text style={[Styles.textDark, {marginLeft: 5}]}>Title</Text>
                        <TextInput style={Styles.textInputDark}
                            value={bookTitle}
                            onChangeText={(text) => {
                                setBookTitle(text)
                                }
                            } >

                        </TextInput>
                        
                        <Text style={[Styles.textDark, {marginTop: 10, marginLeft: 5}]}>Author Name</Text>
                        <TextInput style={Styles.textInputDark}
                            value={bookAuthorName}
                            onChangeText={(text) => {
                                setBookAuthorName(text)
                                }
                            }
                         >
                        </TextInput>
                    </View>
                </View>


                {
                    isLoading ? <Text>Loading Genres...</Text> :
                        <View style={Styles.genrePickerContainer}>
                            <Picker style={Styles.genrePicker} dropdownIconColor={'#FFFFFF'} itemStyle={Styles.genrePickerItem} selectedValue={genre} onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}>
                                {
                                    genreList.map((item, index) => {
                                        return <Picker.Item label={item.name} value={item.id} key={item.id} />
                                    })
                                }
                            </Picker>
                        </View>
                }



                <View style={Styles.hasReadContainer}>
                    <Text style={[Styles.textDark, { marginLeft: 10 }]}>Has Read?</Text>
                    <Switch style={{ paddingLeft: 25 }} value={hasRead} onValueChange={toggleHasRead}></Switch>
                </View>



                <TouchableOpacity style={Styles.touchableButton} onPress={addBook}>
                    <Text style={{ textAlignVertical: 'center', color: 'white', textAlign: 'center', paddingTop: 5 }}>Add Book</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    )
}

const Styles = StyleSheet.create({
     containerDark: {
        flex: 1,
        backgroundColor: '#121212',
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
        marginTop: 50,
        marginLeft: 15,
        flexShrink: 1,
    },

    titleTextDark: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },

    textDark: {
        color: 'white',
    },
    bookThumbnail: {
        height: 200,
        width: 150,
    },

    touchableButton: {
        width: 200,
        height: 40,
        backgroundColor: '#01579b',
        borderRadius: 100,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'center',
    },

    genrePickerContainer: {
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#212121',
    },

    genrePicker: {
        color: 'white',
        height: 50
    },

    genrePickerItem: {
    },

    hasReadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#212121',
    },
    textInputDark: {
        marginLeft: 5,
        height: 40,
        minWidth: 150,
        borderWidth: 1,
        color: 'white',
        backgroundColor: '#181818'
    },
})
export default ManualNewBookScreen