import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Tabs from './navigation/Tabs'
import { createAuthorsTable, createBooksTable, createGenresTable, populateGenresTable } from './database/db'
import { RootSiblingParent } from 'react-native-root-siblings'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  useEffect(() => {
    (async () => {

      const isFirstLaunch = await AsyncStorage.getItem('@is_first_launch')

      if (isFirstLaunch == null) {
        const jsonValue = JSON.stringify(false)
        await AsyncStorage.setItem('@is_first_launch', jsonValue)
        createAuthorsTable()
        createGenresTable()
        createBooksTable()
        populateGenresTable()
      }
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