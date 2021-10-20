import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Tabs from './navigation/Tabs'
import { createAuthorsTable, createBooksTable, createGenresTable, dropAuthorsTable, dropBooksTable, dropGenresTable } from './database/db'


const App = () => {
  useEffect(() => {
    (async () => {
      dropAuthorsTable()
      dropGenresTable()
      dropBooksTable()

      createAuthorsTable()
      createGenresTable()
      createBooksTable()
    })()
  }, [])
  return(
    <SafeAreaProvider>
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App