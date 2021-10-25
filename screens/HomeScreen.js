import React, { useEffect, useState } from 'react'
import { SafeAreaView, Button, StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import BookList from '../components/BookList'
import { getAllBooks } from '../database/db'


const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [bookList, setBookList] = useState([])

    useEffect(() => {
         fetchBookList()
    }, [])
    
    const fetchBookList = async () => {
        const books = await getAllBooks()
        setBookList(books)
        setIsLoading(false)
    }

    return(
        <SafeAreaView style={Styles.containerDark}>
            <Text style={Styles.textDark}>
                Hello from the Home screen!
            </Text>

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
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    },

    textDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})
export default HomeScreen