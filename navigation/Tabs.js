import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import NewBookScreen from '../screens/NewBookScreen'
import SearchScreen from '../screens/SearchScreen'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        return <Ionicons 
                                    name={'home'} 
                                    size={25} 
                                    color={
                                        focused ? 'black' : 'gray'
                                    } 
                                />;
                    }
                }}
            />

            <Tab.Screen 
                name="SearchScreen" 
                component={SearchScreen} 
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        return <Ionicons 
                                    name={'search'} 
                                    size={25} 
                                    color={
                                        focused ? 'black' : 'gray'
                                    } 
                                />;
                    }
                }}
            />

            <Tab.Screen 
                name="NewBook" 
                component={NewBookScreen} 
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        return <Ionicons 
                                    name={'book'} 
                                    size={25} 
                                    color={
                                        focused ? 'black' : 'gray'
                                    } 
                                />;
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;