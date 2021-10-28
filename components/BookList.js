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
                <Text>This is a modal!</Text>
                <Text style={{color: 'white'}}>
                    SELECTED ID: {selectedBook.id}
                </Text>
                <Text style={{color: 'white'}}>
                    SELECTED TITLE: {selectedBook.title}
                </Text>
                <Pressable onPress={() => setModalVisible(!modalVisible)}><Text>Close Modal.</Text></Pressable>
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
        backgroundColor: '#121212'
    }
})
export default BookList