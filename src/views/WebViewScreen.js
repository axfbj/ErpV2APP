import React, { useRef, useState, useEffect } from 'react'
import { BackHandler, ToastAndroid, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

const WebViewScreen = ({ route, setStatusBarColor }) => {
  const url = route.params.url || ''
  const webviewRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [message, setMessage] = useState(null)

  function checkIfStringIsValid(arr, str) {
    return arr.some((s) => str?.includes(s))
  }

  const handleWebViewMessage = (event) => {
    const msg = event.nativeEvent.data
    console.log('触发: 网页发送来给RN的')
    console.log(msg)

    setMessage(msg)
  }

  const sendDataToWebView = (data) => {
    const sendMsg = 'Hello from React Native!'
    const script = `a(${JSON.stringify(data)})`

    webviewRef.current && webviewRef.current.injectJavaScript(script)
  }

  const canGoBackLimit = () => {
    if (checkIfStringIsValid(['MLogin', 'mlogin'], url)) {
      setStatusBarColor('#89cff0')
      setCanGoBack(false)
    } else if (checkIfStringIsValid(['/mapp'], url) && !url.includes('?')) {
      setStatusBarColor('#3c98ff')
      setCanGoBack(false)
    } else {
      setStatusBarColor('#3c98ff')
      setCanGoBack(true)
    }
  }

  useEffect(() => {
    let lastBackPressed = 0
    const handleBackPress = () => {
      if (canGoBack) {
        webviewRef.current && webviewRef.current.goBack()
        return true
      } else {
        const now = Date.now()
        if (now - lastBackPressed < 2000) {
          // 如果用户在 2 秒内双击了 back 按钮
          BackHandler.exitApp() // 退出应用程序
        } else {
          lastBackPressed = now
          ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
        }
        return true
      }
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
  }, [canGoBack])

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        onMessage={handleWebViewMessage}
        style={styles.webview}
        bounces={false}
        overScrollMode={'never'}
        domStorageEnabled={true}
        onError={(err) => {
          console.log('e', err)
        }}
        onLoad={() => {
          sendDataToWebView()
          canGoBackLimit()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
})

export default WebViewScreen
