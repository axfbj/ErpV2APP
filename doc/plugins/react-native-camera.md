## react-native-camera配置

### 安装

```shell
yarn add react-native-camera@4.2.1
react-native link react-native-camera
```

### 配置

#### Android

> 打开 android/app/src/main/java/[...]/MainApplication.java文件，添加的包加在 import区域

```java
// react-native-camera，可自动引入,引一下就行
import org.reactnative.camera.RNCameraPackage;
```

> android/settings.gradle文件里添加

```
include ':react-native-camera'
project(':react-native-camera').projectDir = new File(rootProject.projectDir,   '../node_modules/react-native-camera/android')
```

> android/app/build.gradle文件里添加

```
dependencies {
    // ...
	implementation project(':react-native-camera') // react-native-camera 插件引入
}
```

> android/app/src/main/AndroidManifest.xml 文件中添加

```xml
<!-- Required -->
<uses-permission android:name="android.permission.CAMERA" />
```

> android/app/build.gradle 文件中的下列位置添加

```gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' // <--- insert this line
  }
}
```

#### IOS

> 权限添加到ios目录下 Info.plist

```
<!-- Required with iOS 10 and higher -->
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
```

