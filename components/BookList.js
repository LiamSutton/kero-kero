import React, { useState } from 'react'
import { Text } from 'react-native'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import Book from './Book'

const BookList = (props) => {
    const books = props.books
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedBook, setSelectedBook] = useState({})
    return(
        <View style={Styles.container}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
            
                <View style={Styles.modalContainer}>
                    <View style={Styles.bookInfoContainer}>
                        <Text style={Styles.textDark}>
                            SELECTED ID: {selectedBook.id}
                        </Text>
                        <Text style={Styles.textDark}>
                            SELECTED TITLE: {selectedBook.title}
                        </Text>
                        <Text style={Styles.textDark}>
                            SELECTED AUTHOR: {selectedBook.author}
                        </Text>
                        <Text style={Styles.textDark}>
                            SELECTED GENRE: {selectedBook.genre}
                        </Text>
                    <TouchableOpacity style={Styles.closeModalButton} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{textAlignVertical: 'center', color: 'white', textAlign: 'center'}}>Close Modal.</Text>
                    </TouchableOpacity>
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

    closeModalButton: {
        width: 200,
        height: 40,
        backgroundColor: '#01579b',
        borderRadius: 15,
        marginTop: 20,
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