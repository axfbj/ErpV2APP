import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isValidUrl,validateString } from '../utils/tools'
import { CommonActions } from '@react-navigation/native'
// import { StackActions } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [url, setUrl] = useState('')

  const handlePress = async () => {
    if (isValidUrl(url)) {
      if(validateString(url)) {
        await AsyncStorage.setItem('url', url)
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'WebView', params: { url: url } }],
        })
        navigation.dispatch(resetAction)
      }else {
        Alert.alert('项目地址中不要含有# $ ? * 字符,地址末尾要以/mapp 或 /mlogin.jsp结尾',)
      }
    } else {
      Alert.alert('请配置一个格式正确的项目地址')
    }
  }

  useEffect(() => {
    async function getUrlFromStorage() {
      try {
        const storedUrl = await AsyncStorage.getItem('url')
        if (storedUrl !== null) {
          setUrl(storedUrl)
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'WebView', params: { url: storedUrl } }],
          })
          navigation.dispatch(resetAction)
          // navigation.navigate('WebView', { url: storedUrl })
          // const resetAction = StackActions.replace('WebView', { url: storedUrl })
          // navigation.dispatch(resetAction)
        } else {
          setUrl(route.params.url || '')
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
