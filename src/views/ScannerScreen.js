import React from 'react'
import { View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { useNavigation, useRoute } from '@react-navigation/native'

function ScannerScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { onScanResult } = route.params

  const handleBarCodeScanned = ({ data }) => {
    onScanResult(data)
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera style={{ flex: 1 }} onBarCodeRead={handleBarCodeScanned} captureAudio={false} />
    </View>
  )
}

export default ScannerScreen
