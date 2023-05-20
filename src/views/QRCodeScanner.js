import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'
const QRCodeScanner = () => {
  const [scanning, setScanning] = useState(false)

  const handleScanPress = () => {
    setScanning(true)
  }

  const handleBarcodeRecognized = ({ barcodes }) => {
    if (barcodes && barcodes.length > 0) {
      const barcode = barcodes[0]
      // 处理扫描到的二维码
      Alert.alert('Barcode Scanned', JSON.stringify(barcode.data))
      setScanning(false)
    }
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false}
        onGoogleVisionBarcodesDetected={scanning ? handleBarcodeRecognized : null}
      />
      {!scanning && (
        <TouchableOpacity style={styles.button} onPress={handleScanPress}>
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default QRCodeScanner
