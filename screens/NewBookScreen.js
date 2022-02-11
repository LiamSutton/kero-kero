import React, { useState, useEffect} from 'react'
import { SafeAreaView, Text, Image, View, TouchableOpacity, Switch} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { getAllAuthors, getAllGenres, getAuthorByName, getBookByISBN, insertAuthor, insertBook } from '../database/db'
import dayjs from 'dayjs'
import Toast from 'react-native-root-toast'
import * as FileSystem from 'expo-file-system'

const NewBookScreen = ({ route, navigation}) => {
    const { isbn } = route.params
    // const debugISBN = '9781526634450' // used when dont have access to / cant be bothered using scanner :)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [genre, setGenre] = useState(1)
    const [hasRead, setHasRead] = useState(false)
    const [genreList, setGenreList] = useState([{id: '1', name: 'Action'}])
    
    useEffect(() => {
        const setupScreen = async () => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
            .then((response) => response.json())
            .then((json) => {
                setData(json.items[0].volumeInfo)
            }).finally(async() => {
                const list = await getAllGenres()
                setGenreList(list)
                setIsLoading(false)
            })
        }
        setupScreen()
    }, []);

    const toggleHasRead = () => setHasRead(!hasRead)

    const fetchBookDetails = async () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then((response) => response.json())
        .then((json) => {
            setData(json.items[0].volumeInfo)
        })
        .catch((error) => console.log(error))
    }

    const populateGenreList = async () => {
        const list = await getAllGenres()
        setGenreList(list)
        setIsLoading(false)
    }

    const addBook = async () => {
        let book = await prepareBook()
        if (book != null) {
        const bookId = await insertBook(book)
        
        let toast = Toast.show(bookId != null ? "Book added to your library. 🥳" : "Unable to add book to your library. 😔",
            {duration: Toast.durations.SHORT})
        
         navigation.navigate("Home", {
         })
        } else {
            let toast = Toast.show("This book is already in your library? 🤔", 
            {duration: Toast.durations.SHORT})
        }
    }

    const prepareBook = async () => {

        let bookId = await getBookByISBN(isbn);
        if (bookId != null) {
            return null
        }
        const authorName = data.authors[0]
        console.log(authorName)
        let authorId = await handleAuthor(authorName)
        console.log(authorId);
        const dateCreated = dayjs().format("YYYY-MM-DD")
        console.log("Genre: " + genre)
        
        // Download to phone (move into own method???)
        FileSystem.downloadAsync(
            data.imageLinks.thumbnail,
           `${FileSystem.documentDirectory}${data.title}.png`
        ).then(({uri}) => {
            console.log("Finished downloading to " + uri)
        }).catch(error => {
            console.error(error)
        })

        let book = {
            title: data.title,
            authorId: authorId,
            genreId: genre,
            isbn: isbn, // TODO: make sure to change this when using the barcode scanner
            datePublished: data.publishedDate,
            dateCreated: dateCreated,
            cover: `${FileSystem.documentDirectory}${data.title}.png`,
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

    const downloadBookCover = async () => {
        return new Promise((resolve) => {
            const documentDir = FileSystem.documentDirectory
            resolve(documentDir)
        }) 
    }
    return(
        <SafeAreaView style={Styles.containerDark}>
            {
                isLoading ? <Text>Loading...</Text> :
                <View style={Styles.bookContainer}>
                    <Image 
                        style={Styles.bookThumbnail}
                        source={{uri: data.imageLinks.thumbnail}}
                    />
                    <View style={Styles.bookTextContainer}>
                        <Text style={Styles.titleTextDark}>
                            {data.title}
                        </Text>
                        <Text style={Styles.textDark}>
                            {data.authors}
                        </Text>
                        <Text style={Styles.textDark}>
                            {dayjs(data.publishedDate).format("DD/MM/YYYY")}
                        </Text>
                    </View>
                </View>
            }

            {
                isLoading ? <Text>Loading Genres...</Text> :
                <View style={Styles.genrePickerContainer}>
                  <Picker style={Styles.genrePicker} dropdownIconColor={'#FFFFFF'} itemStyle={Styles.genrePickerItem} selectedValue={genre} onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}>
                         {
                            genreList.map((item, index) => {
                                return <Picker.Item label={item.name} value={item.id} key={item.id}/>
                            })
                        }
                    </Picker>
                </View>
            }
     
            <View style={Styles.hasReadContainer}>
                <Text style={[Styles.textDark, {marginLeft: 10}]}>Has Read?</Text>
                <Switch style={{paddingLeft: 25}} value={hasRead} onValueChange={toggleHasRead}></Switch>
            </View>
            
            <TouchableOpacity style={Styles.touchableButton} onPress={addBook}>
                <Text style={{textAlignVertical: 'center', color: 'white', textAlign: 'center', paddingTop: 5}}>Add Book</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    }
})

const NavigateToHome = () => {
    navigation.navigate("Home")
}
export default NewBookScreen