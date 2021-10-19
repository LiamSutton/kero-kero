import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Tabs from './navigation/Tabs'
import { createGenresTable, dropAuthorsTable, getAllGenres, getGenreByName } from './database/db'


const App = () => {
  
  return(
    <SafeAreaProvider>
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App