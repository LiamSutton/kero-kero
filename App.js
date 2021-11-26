import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Tabs from './navigation/Tabs'
import { createAuthorsTable, createBooksTable, createGenresTable, dropAuthorsTable, dropBooksTable, dropGenresTable, getAllGenres, populateGenresTable } from './database/db'
import { RootSiblingParent } from 'react-native-root-siblings'

const App = () => {
  useEffect(() => {
    (async () => {
      // dropBooksTable()
      // dropAuthorsTable()
      // dropGenresTable()

      // createAuthorsTable()
      // createGenresTable()
      // createBooksTable()
      // populateGenresTable()
    })()
  }, [])
  return(
    <RootSiblingParent>
      <SafeAreaProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
      </SafeAreaProvider>
    </RootSiblingParent>
  )
}

export default App