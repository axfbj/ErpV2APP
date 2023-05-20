import React from 'react'
import { StyleSheet, View } from 'react-native'
import QRCodeScanner from './views/QRCodeScanner' // 根据组件所在路径进行调整

const App = () => {
  return (
    <View style={styles.container}>
      <QRCodeScanner />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
