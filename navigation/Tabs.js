import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Icon} from 'react-native-elements'
import HomeScreen from '../screens/HomeScreen'
import NewBookScreen from '../screens/NewBookScreen'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
            />
            <Tab.Screen 
                name="NewBook" 
                component={NewBookScreen} 
            />
        </Tab.Navigator>
    )
}

export default Tabs;