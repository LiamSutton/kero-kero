import React, { useState, useEffect} from 'react'
import { SafeAreaView, Text, Image, View, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { getAllAuthors, getAllGenres, getAuthorByName, getBookByISBN, insertAuthor, insertBook } from '../database/db'
import dayjs from 'dayjs'

const NewBookScreen = ({ route, navigation}) => {
    // const { isbn } = route.params
    const debugISBN = '1423131975' // used when dont have access to / cant be bothered using scanner :)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [genre, setGenre] = useState()
    const [genreList, setGenreList] = useState([{id: '-1', name: 'Unknown'}])
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${debugISBN}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(async() => {
            const list = await getAllGenres()
            setGenreList(list)
            setIsLoading(false)
        })
    }, []);

    const addBook = async () => {
        const title = data.items[0].volumeInfo.title
        const authorName = data.items[0].volumeInfo.authors[0]
        const genreID = genre
        let authorId = await getAuthorByName(authorName)
    
        if (authorId == null) {
            authorId = await insertAuthor(authorName)
        }

        const bookISBN = debugISBN
        const datePublished = data.items[0].volumeInfo.publishedDate;
        const dateCreated = dayjs().format("YYYY-MM-DD")
        const cover = `https://covers.openlibrary.org/b/isbn/${bookISBN}-L.jpg`

        let bookId = await getBookByISBN(bookISBN)
        console.log(bookId)
        if (bookId == null) {
            const inserted = await insertBook(title, authorId, genreID, bookISBN, datePublished, dateCreated, cover);
            console.log(inserted)
        } else {
            // todo: handle rejection when book already exists
        }
    }
    return(
        <SafeAreaView style={Styles.containerDark}>
            {
                isLoading ? <Text>Loading...</Text> :
                <View style={Styles.cardItemDark}>
                     <Image style={Styles.bookThumbnail} source={{uri: `https://covers.openlibrary.org/b/isbn/${debugISBN}-L.jpg`}}>
                    </Image>
                    <Text style={Styles.textDark}>
                        {data.items[0].volumeInfo.title}
                    </Text>
                    <Text style={Styles.textDark}>
                        {data.items[0].volumeInfo.authors}
                    </Text>
                    <Text style={Styles.textDark}>
                        {data.items[0].volumeInfo.publishedDate}
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