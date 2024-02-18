import { Platform } from 'react-native'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
export async function requestCameraPermission() {
  try {
    const permissionStatus = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)

    if (permissionStatus === RESULTS.GRANTED) {
      console.log('Camera permission granted')
    } else {
      console.log('Camera permission denied')
    }
  } catch (error) {
    console.warn(error)
  }
}
