import React, { useEffect } from 'react'
import { View, Button } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'

function ScannerScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  const handleBarCodeScanned = ({ data }) => {
    navigation.navigate('Result', { scanResult: data })
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera style={{ flex: 1 }} onBarCodeRead={handleBarCodeScanned} captureAudio={false} />
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </View>
  )
}

export default ScannerScreen
