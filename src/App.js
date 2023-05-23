import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './views/HomeScreen'
import WebViewScreen from './views/WebViewScreen'
import ScannerScreen from './views/ScannerScreen'
import ResultScreen from './views/ResultScreen'

const Stack = createNativeStackNavigator()
function Header({ statusBarColor }) {
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: statusBarColor }} />
    </View>
  )
}

const App = () => {
  useEffect(() => {
    // 在这里执行 componentDidMount 的逻辑
    //ios还没配置，目前只有anroid使用了这个插件
    // if (Platform.OS === 'android') {
    SplashScreen.hide()
    // }
  }, [])

  const [statusBarColor, setStatusBarColor] = useState('#fff')
  return (
    <>
      <Header statusBarColor={statusBarColor} />
      {/* <StatusBar backgroundColor="#3c98ff" translucent={true} barStyle="dark-content"/> */}
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <HomeScreen {...props} setStatusBarColor={setStatusBarColor} />}
            </Stack.Screen>
            <Stack.Screen name="WebView" options={{ headerShown: false }}>
              {(props) => <WebViewScreen {...props} setStatusBarColor={setStatusBarColor} />}
            </Stack.Screen>
            <Stack.Screen
              name="Scanner"
              options={{
                headerTitleAlign: 'center',
                title: '扫描二维码',
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#3c98ff',
                },
              }}
            >
              {(props) => <ScannerScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      {/* <View style={{backgroundColor:'red',height: 20}}>
      </View> */}
    </>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: 'transparent'
    // backgroundColor:'#3c98ff'
  },
})

export default App
