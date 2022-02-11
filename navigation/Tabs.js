import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from '../screens/HomeScreen'
import NewBookScreen from '../screens/NewBookScreen'
import SearchScreen from '../screens/SearchScreen'
import ScanBookScreen from '../screens/ScanBookScreen'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: Styles.darkTheme.backgroundColor,
                borderTopWidth: 0 // removes white line
            },
            headerStyle: {
                backgroundColor: '#002f6c',
                shadowRadius: 0, // removes white line
                shadowOffset: {
                    height: 0
                },
            },
            headerTitleStyle: {
                color: '#FFFFFF'
            },

        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarShowLabel: false,
                    unmountOnBlur: true, // force reload whenever user navigates away / to the screen
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={'home'}
                            size={25}
                            color={focused ? Styles.tabFocused.color : Styles.tabUnfocused.color}
                        />;
                    },
                }}
            />

            <Tab.Screen
                name="Search Screen"
                component={SearchScreen}
                options={{
                    tabBarShowLabel: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={'search'}
                            size={25}
                            color={focused ? Styles.tabFocused.color : Styles.tabUnfocused.color}
                        />;
                    }
                }}
            />

            <Tab.Screen
                name="New Book"
                component={NewBookScreen}
                options={{
                    tabBarShowLabel: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons style={{}}
                            name={'book'}
                            size={25}
                            color={focused ? Styles.tabFocused.color : Styles.tabUnfocused.color}
                        />;
                    }
                }}
            />

            <Tab.Screen
                name="Scan Book"
                component={ScanBookScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons style={{}}
                            name={'camera'}
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
    container: {
        flex: 1
    },
    tabFocused: {
        color: 'white',
    },

    tabUnfocused: {
        color: '#00227b',
    },

    darkTheme: {
        backgroundColor: '#01579b'
    }
})
export default Tabs;