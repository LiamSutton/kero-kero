import React, { useState } from 'react'
import { Text } from 'react-native'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import { TextInput } from 'react-native'
import { Switch } from 'react-native'
import Toast from 'react-native-root-toast'
import { updateBook, deleteBook } from '../database/db'
import Book from './Book'

const BookList = (props) => {
    const books = props.books
    const genres = props.genres
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedBook, setSelectedBook] = useState({})
    
    const [bookTitle, setBookTitle] = useState('')
    const [bookGenreId, setBookGenreId] = useState()
    const [bookHasRead, setBookHasRead] = useState()

    const toggleHasRead = () => setBookHasRead(!bookHasRead)

    const editBook = async () => {
        selectedBook.title = bookTitle
        selectedBook.genreId = bookGenreId
        selectedBook.genre = genres.find((genre) => genre.id == bookGenreId).name // TODO: maybe make genres a dict? map id -> name?
        selectedBook.hasRead = bookHasRead
        let updatedBook = await updateBook(selectedBook);

        let toast = await Toast.show('Updated book. 🚀', Toast.durations.SHORT);
        
        setModalVisible(!modalVisible)
    }

    return(
        <View style={Styles.container}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
            
                <View style={Styles.modalContainer}>
                    <View style={Styles.bookInfoContainer}>
                        <Image style={Styles.bookThumbmail} source={{uri: selectedBook.cover}} />
                        <TextInput 
                            style={Styles.textInputDark}
                            onChangeText={(text) => {
                                    setBookTitle(text)
                                }
                            }
                            value={bookTitle}>
                        </TextInput>
                        <View style={Styles.genrePickerContainer}>
                  <Picker style={Styles.genrePicker} dropdownIconColor={'#FFFFFF'} itemStyle={Styles.genrePickerItem} selectedValue={bookGenreId} onValueChange={(itemValue, itemIndex) => setBookGenreId(itemValue)}>
                         {
                            genres.map((item, index) => {
                                return <Picker.Item label={item.name} value={item.id} key={item.id}/>
                            })
                        }
                    </Picker>
                        </View>
                        <View style={Styles.hasReadContainer}>
                            <Text style={[Styles.textDark, {marginLeft: 10}]}>Has Read?</Text>
                            <Switch style={{paddingLeft: 25}} value={bookHasRead == 1} onValueChange={toggleHasRead}></Switch>
                        </View>
                        <View style={Styles.modalButtonsContainer}>
                            <TouchableOpacity style={Styles.closeModalButton} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={{textAlignVertical: 'center', color: 'white', textAlign: 'center'}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.saveChangesModalButton} onPress={editBook}>
                                <Text style={{textAlignVertical: 'center', color: 'white', textAlign: 'center'}}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
                            
            <FlatList 
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={() => {
                            setSelectedBook(item)
                            setBookTitle(item.title)
                            setBookHasRead(item.hasRead)
                            setBookGenreId(item.genreId)
                            setModalVisible(!modalVisible)
                        }}>
                            <Book bookInfo={item} />
                        </TouchableOpacity>
                    )
                }}
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
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: '#121212',
        paddingBottom: 20,
    },

    textInputDark: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
        backgroundColor: '#181818'
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },

    closeModalButton: {
        width: 150,
        height: 40,
        backgroundColor: '#01579b',
        borderRadius: 15,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
    },
    
    saveChangesModalButton: {
        width: 150,
        height: 40,
        backgroundColor: '#50d464',
        borderRadius: 15,
        marginTop: 20,
        marginLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
    },

    bookInfoContainer: {
        flex: 1,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        paddingTop: 100,
        backgroundColor: '#212121'
    },

    bookTextContainer: {
        marginLeft: 15,
        flexShrink: 1,
    },
    genrePickerContainer: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#181818',
    },

    genrePicker: {
        color: 'white',
        height: 50
    },

    genrePickerItem: {
        
    },
    bookThumbmail: {
        height: 300,
        width: 250,
        alignSelf: 'center',
        marginBottom: 25,
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
export default BookList