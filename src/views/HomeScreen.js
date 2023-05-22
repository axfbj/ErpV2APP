import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'

const HomeScreen = ({ setStatusBarColor }) => {
  const navigation = useNavigation()
  const [url, setUrl] = useState('')

  const handlePress = async () => {
    if (isValidUrl(url)) {
      await AsyncStorage.setItem('url', url)
      // navigation.navigate('WebView' as never, { url } as never)
      const resetAction = StackActions.replace('WebView', { url })
      navigation.dispatch(resetAction)
    } else {
      Alert.alert('请配置一个格式正确的项目地址')
    }
  }

  const isValidUrl = (urlStr) => {
    // 判断输入的字符串是否为一个合法的地址格式
    const pattern = /^(http|https):\/\/([\w.]+\/?)\S*$/
    return pattern.test(urlStr)
  }

  setStatusBarColor('#fff')
  useEffect(() => {
    async function getUrlFromStorage() {
      try {
        const storedUrl = await AsyncStorage.getItem('url')
        if (storedUrl !== null) {
          setUrl(storedUrl) // 假设默认 URL 为 https://example.com
          // const resetAction = StackActions.replace('WebView', { url: storedUrl })
          // navigation.dispatch(resetAction)
        } else {
          setUrl('')
        }
      } catch (error) {
        console.log('Error retrieving URL from storage:', error)
      }
    }
    getUrlFromStorage()
  }, [navigation])
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="项目地址" onChangeText={setUrl} value={url} />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>跳转</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
})

export default HomeScreen
