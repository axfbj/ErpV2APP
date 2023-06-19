import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingOverlay
