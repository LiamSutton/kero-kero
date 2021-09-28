import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import NewBookScreen from '../screens/NewBookScreen'
import SearchScreen from '../screens/SearchScreen'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: '#6103EE'
            }
        
        }}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                    return <Ionicons 
                            name={'home'} 
                            size={25} 
                            color={focused ? Styles.tabFocused.color : Styles.tabUnfocused.color}
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
                            color={focused ? Styles.tabFocused.color : Styles.tabUnfocused.color}
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
                    return <Ionicons style={{}}
                            name={'book'} 
                            size={25} 
                            color={focused ? Styles.tabFocused.color : Styles.tabUnfocused.color} 
                            />;
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const Styles = StyleSheet.create({
    tabFocused: {
        color: 'white',
    },

    tabUnfocused: {
        color: '#7E3FF2',
    },
})
export default Tabs;