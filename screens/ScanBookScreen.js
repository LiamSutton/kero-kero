import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Ionicons from '@expo/vector-icons/Ionicons'

const ScanBookScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const handleBarcodeScanned = ({ type, data }) => {
        setScanned(true)
        console.log(data)
        navigation.navigate("New Book", {
            // route params
            isbn: data
        })
    }

    const handleManualEntryNavigation = () => {
        navigation.navigate("Manual Entry")
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={Styles.containerDark}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <Ionicons
                style={{position: 'absolute', bottom: 25, alignSelf: 'flex-end'}}
                name={'add-circle'}
                size={125}
                color={'#01579b'}
                onPress={handleManualEntryNavigation}
            />
            {scanned && <Button title={"Tap To Scan Again."} onPress={() => setScanned(false)} />}
        </View>
    )
}

const Styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
    }
})

export default ScanBookScreen;