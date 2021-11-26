import React, { useState } from 'react'
import { Text } from 'react-native'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import { TextInput } from 'react-native'
import Toast from 'react-native-root-toast'
import { getBookByISBN, updateBookTitle } from '../database/db'
import Book from './Book'

const BookList = (props) => {
    const books = props.books
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedBook, setSelectedBook] = useState({})
    const [bookTitle, setBookTitle] = useState('')

    //TODO: Updating a book title doesnt work.
    const updateBook = async () => {
        let id = selectedBook.id
        let title = bookTitle;
        
        let updatedTitle = await updateBookTitle(id, title);

        let toast = await Toast.show('Updated book title. 🚀', Toast.durations.SHORT);

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
                        <TextInput 
                            style={Styles.textInputDark}
                            onChangeText={(text) => {
                                    console.log(text)
                                    setBookTitle(text)
                                }
                            }
                            value={bookTitle}>
                        </TextInput>
                        <Text style={Styles.textDark}>
                            SELECTED AUTHOR: {selectedBook.author}
                        </Text>
                        <Text style={Styles.textDark}>
                            SELECTED GENRE: {selectedBook.genre}
                        </Text>
                        <View style={Styles.modalButtonsContainer}>
                            <TouchableOpacity style={Styles.closeModalButton} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={{textAlignVertical: 'center', color: 'white', textAlign: 'center'}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.saveChangesModalButton} onPress={updateBook}>
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
        backgroundColor: '#BA000D',
        borderRadius: 15,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'center',
    },

    saveChangesModalButton: {
        width: 150,
        height: 40,
        backgroundColor: '#01579b',
        borderRadius: 15,
        marginTop: 20,
        marginLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        alignSelf: 'center',
    },

    bookInfoContainer: {
        flex: 1,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#212121'
    },

    bookTextContainer: {
        marginLeft: 15,
        flexShrink: 1,
    },
})
export default BookList