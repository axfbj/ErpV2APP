import React, { useState } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

function ResultScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  const scanResult = route.params?.scanResult || ''
  const [inputValue, setInputValue] = useState('')

  const handleScanButtonPress = () => {
    navigation.navigate('Scanner')
  }

  const handleInputChange = (text) => {
    setInputValue(text)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={handleInputChange}
        value={inputValue}
      />
      <Text>Scan Result: {scanResult}</Text>
      <Button title="Scan" onPress={handleScanButtonPress} />
    </View>
  )
}

export default ResultScreen
