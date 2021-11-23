import React, { useEffect, useState } from 'react'
import { SafeAreaView, Button, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { Text, View } from 'react-native'
import BookList from '../components/BookList'
import { getAllBooks } from '../database/db'


const HomeScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        if (navigation.isFocused()) {
            fetchBookList()
        }
    }, [navigation.isFocused()])
    
    const fetchBookList = async () => {
        const books = await getAllBooks()
        setBookList(books)
        setIsLoading(false)
    }

    return(
        <SafeAreaView style={Styles.containerDark}>
            {
                isLoading ? 
                <Text style={Styles.textDark}>Loading books...</Text> : 
                <BookList books={bookList}/>
            }
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        backgroundColor: '#121212',
    },

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})
export default HomeScreen