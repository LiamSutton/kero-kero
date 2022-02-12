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
        navigation.navigate("New Book", {
            isbn: data  // route params
        })
    }

    const handleManualEntryNavigation = () => {
        navigation.navigate("Manually Enter ISBN")
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
            <Text style={Styles.overlayText}>
                Add Manually
            </Text>
            <Ionicons
                style={{position: 'absolute', bottom: 25, right: 25, alignSelf: 'flex-end'}}
                name={'add-circle'}
                size={75}
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
    },

    overlayText: {
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        bottom: 100,
        fontSize: 20,
        right: 5,
        alignSelf: 'flex-end',
    },
})

export default ScanBookScreen;