import React, { useRef, useState, useEffect } from 'react'
import { BackHandler, ToastAndroid, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import { useNavigation, useRoute } from '@react-navigation/native'
import LoadingOverlay from '../componets/LoadingOverlay'
import { isJSON } from '../utils/tools'
import { downloadAndOpenFile } from '../utils/preview-file'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { requestCameraPermission } from '../utils/permission'
// import { Platform } from 'react-native'

const WebViewScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const url = route.params.url || ''
  const [isLoaded, setLoaded] = useState(false)
  const [verifyPass, setVerifyPass] = useState(false)
  // const timeoutRef = useRef(null) // 在useEffect使用定时器，必须要使用useRef定义
  // const verifyTimeOutRef = useRef(null) // 在useEffect使用定时器，必须要使用useRef定义
  // const [loadCount, setLoadCount] = useState(0)
  const webviewRef = useRef(null)
  // let url = route.params?.url || ''
  let msg_id = ''

  const handleWebViewMessage = (event) => {
    const data = event.nativeEvent.data
    console.log('网页给RN发送来得message:' + data)
    let paseData = null
    const is_json = isJSON(data)
    if (is_json) {
      paseData = JSON.parse(data)
    } else {
      paseData = data
    }

    if (is_json && Object.prototype.hasOwnProperty.call(paseData, 'func')) {
      const func = paseData.func
      msg_id = paseData.msgId
      //启动摄像头
      if (func === 'open-scan') {
        navigation.navigate('Scanner', { onScanResult: handleScanResult })
      }
      //下载预览文件
      // console.log('func', func)
      if (func === 'preview-file') {
        const previewOption = paseData.previewOption
        if (previewOption) {
          console.log('previewOption', previewOption)
          const fromUrl = previewOption.fileUrl
          const fileName = previewOption.fileName
          downloadAndOpenFile(fromUrl, fileName)
        }
      }
    }

    //验证是否是正确的项目,不正确则返回地址页面，正确则关闭loading  setLoaded(true)
    if (typeof paseData === 'string' && paseData === 'flagYun2') {
      console.log('收到来自网页的验证消息')
      setVerifyPass(true)
    }
    if (typeof paseData === 'string' && paseData === 'backHomeScreen') {
      onBackHomeScreen()
    }
    if (typeof paseData === 'string' && paseData === 'getCameraPermission') {
      requestCameraPermission()
    }
  }

  const handleScanResult = (scanResult) => {
    // 处理扫描结果
    // console.log('扫描结果:', scanResult)
    // webviewRef.current && webviewRef.current.requestFocus()
    const script = `acceptDataFromRN(${JSON.stringify({ msgId: msg_id, type: 'scanner', scanResult })})`
    webviewRef.current && webviewRef.current.injectJavaScript(script)
  }

  // const sendDataToWebView = (data) => {
  //   const script = `acceptDataFromRN(${JSON.stringify(data)})`
  //   webviewRef.current && webviewRef.current.injectJavaScript(script)
  // }

  const handleButtonClick = async () => {
    onBackHomeScreen()
    // 处理按钮点击事件
    // requestCameraPermission()
    // console.log('Button clicked')
    // const fromUrl =
    //   'http://192.168.1.245:9527/AtomTest/api/file/fileGet?method=local&id=5704eec7-d055-45db-abbe-5fb9057b1be0.png&year=2023&type=PMO&contentType=image/png&month=6&day=0&fileName=85e75526-cfdf-4b5f-920b-ad419e71aeb7.png&username=gly&password=123'
    // const fileName = '85e75526-cfdf-4b5f-920b-ad419e71aeb7.png'
    // downloadAndOpenFile(fromUrl, fileName)
  }

  useEffect(() => {
    let lastBackPressed = 0
    const handleBackPress = () => {
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
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return () => {
      // 清理副作用
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
      // clearTimeout(timeoutRef.current)
      // clearTimeout(verifyTimeOutRef.current)
    }
  }, [])

  // useEffect(() => {
  //   if (loadCount === 1 && isLoaded && !verifyPass) {
  //     clearTimeout(timeoutRef.current)
  //     verifyTimeOutRef.current = setTimeout(() => {
  //       console.log('加载完成4秒未收到验证消息,返回home页')
  //       onBackHomeScreen()
  //     }, 4000) //如果页面已经加载完成，4秒内收不到验证消息，返回home
  //   }
  //   if (loadCount === 2 && isLoaded && verifyPass) {
  //     clearTimeout(timeoutRef.current)
  //     clearTimeout(verifyTimeOutRef.current)
  //   }
  // }, [isLoaded, verifyPass, loadCount])

  // useEffect(() => {
  //   if (loadCount === 0) {
  //     timeoutRef.current = setTimeout(() => {
  //       onBackHomeScreen()
  //     }, 12000) // Adju
  //   }
  //   if (loadCount === 1) {
  //     webviewRef.current.reload()
  //   }
  // }, [loadCount])

  const handleWebViewLoadStart = () => {
    setLoaded(true)
  }

  const handleWebViewProgress = () => {
    const injectedJS = `
      console.log('插入使用rn运行时的脚本')
      sessionStorage.setItem("mode","rn")
    `
    webviewRef.current.injectJavaScript(injectedJS)
  }

  const handleWebViewLoadEnd = () => {
    setLoaded(false)
  }

  const onBackHomeScreen = async () => {
    AsyncStorage.removeItem('url')
      .then(() => {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home', params: { url: url } }],
        })
        navigation.dispatch(resetAction)
      }) // 导航到Home页面)
      .catch((error) => console.log('Error removing data:', error))
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{ uri: url }}
        onMessage={handleWebViewMessage}
        bounces={false}
        domStorageEnabled={true}
        onLoadStart={handleWebViewLoadStart}
        onLoadProgress={handleWebViewProgress}
        onLoadEnd={handleWebViewLoadEnd}
        onError={() => {
          onBackHomeScreen()
        }}
      />
      {!verifyPass && (
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>返回地址页</Text>
        </TouchableOpacity>
      )}
      {isLoaded && <LoadingOverlay />}
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
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default WebViewScreen
