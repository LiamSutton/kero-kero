import React, { useState, useEffect} from 'react'
import { SafeAreaView, Text, Image, View, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { getAllAuthors, getAllGenres, getAuthorByName, getBookByISBN, insertAuthor, insertBook } from '../database/db'
import dayjs from 'dayjs'
import Toast from 'react-native-root-toast'

const NewBookScreen = ({ route, navigation}) => {
    // const { isbn } = route.params
    const debugISBN = '0439784549' // used when dont have access to / cant be bothered using scanner :)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [genre, setGenre] = useState()
    const [genreList, setGenreList] = useState([{id: '-1', name: 'Unknown'}])
    
    useEffect(() => {
        const setupScreen = async () => {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${debugISBN}`)
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

    const fetchBookDetails = async () => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${debugISBN}`)
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
        let toast = Toast.show(bookId == null ? "Unable to add book." : "Book added to your Library 🥳", {duration: Toast.durations.SHORT})
        } else {
            let toast = Toast.show("This book is already in your Library.", {duration: Toast.durations.SHORT})
        }
    }

    const prepareBook = async () => {
        let bookId = await getBookByISBN(debugISBN);
        if (bookId != null) {
            console.log("[INFO]: Book with this isbn already exists in the Library.")
            return null
        }
        const authorName = data.authors[0]
        console.log(authorName)
        let authorId = await handleAuthor(authorName)
        console.log(authorId);
        const dateCreated = dayjs().format("YYYY-MM-DD")
        console.log("BOOK DATA: ")
        let book = {
            title: data.title,
            authorId: authorId,
            genreId: genre,
            isbn: debugISBN, // TODO: make sure to change this when using the barcode scanner
            datePublished: data.publishedDate,
            dateCreated: dateCreated,
            cover: data.imageLinks.thumbnail
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
    return(
        <SafeAreaView style={Styles.containerDark}>
            {
                isLoading ? <Text>Loading...</Text> :
                <View style={Styles.cardItemDark}>
                     <Image style={Styles.bookThumbnail} source={{uri: data.imageLinks.thumbnail}}>
                    </Image>
                    <Text style={Styles.textDark}>
                        {data.title}
                    </Text>
                    <Text style={Styles.textDark}>
                        {data.authors}
                    </Text>
                    <Text style={Styles.textDark}>
                        {data.publishedDate}
                    </Text>

                    <Picker style={Styles.genrePicker} dropdownIconColor={'#FFFFFF'} itemStyle={Styles.genrePickerItem} selectedValue={genre} onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}>
                        {
                            genreList.map((item, index) => {
                                return <Picker.Item label={item.name} value={item.id} key={item.id}/>
                            })
                        }
                    </Picker>
                </View>
            }
            <TouchableOpacity style={Styles.touchableButton} onPress={addBook}>
                <Text style={Styles.textDark}>Add Book</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center'
    },

    cardItemDark: {
        marginTop: 25,
        backgroundColor: '#212121',
        alignItems: 'center',
        height: 500,
        width: '90%'
    },  

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    bookThumbnail: {
        marginTop: 20,
        height: 200,
        width: 150,
        resizeMode: 'contain'
    },

    touchableButton: {
        backgroundColor: '#01579b',
        borderRadius: 15,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
    
    genrePicker: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF',
    },

    genrePickerItem: {
        color: '#000000',
    }
})

const NavigateToHome = () => {
    navigation.navigate("Home")
}
export default NewBookScreen