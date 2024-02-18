import React, { useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './views/HomeScreen'
import WebViewScreen from './views/WebViewScreen'
import ScannerScreen from './views/ScannerScreen'
// import ResultScreen from './views/ResultScreen'
const Stack = createNativeStackNavigator()
function Header() {
  return (
    <View>
      <SafeAreaView />
    </View>
  )
}

const App = () => {
  useEffect(() => {
    // 在这里执行 componentDidMount 的逻辑
    //ios还没配置，目前只有anroid使用了这个插件
    // if (Platform.OS === 'android') {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1200)
    // }
  }, [])

  return (
    <>
      <Header />
      {/* <StatusBar backgroundColor="#3c98ff" translucent={true} barStyle="dark-content"/>*/}
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WebView" component={WebViewScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Scanner"
              component={ScannerScreen}
              options={{
                headerTitleAlign: 'center',
                title: '扫描二维码',
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#3c98ff',
                },
              }}
            />
            {/* <Stack.Screen name="Result" options={{ headerShown: false }}>
              {(props) => <ResultScreen {...props} />}
            </Stack.Screen> */}
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
