# react-native-splash-screen配置

## Android

> 安装 

```bash
yarn add react-native-splash-screen@3.3.0
```



> android/settings.gradle 文件添加

```
include ':react-native-splash-screen'   
project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')
```

> android/app/build.gradle file 添加

```
...
dependencies {
    ...
    implementation project(':react-native-splash-screen')
}
```

> MainApplication.java 添加如下

```java
import org.devio.rn.splashscreen.SplashScreen; // react-native-splash-screen 可自动引入，引用一下就行
```

>  MainActivity.java 添加如下

```java
import android.os.Bundle; // react-native-splash-screen 要求引入
import com.facebook.react.ReactActivity;


public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // react-native-splash-screen 要求引入
        super.onCreate(savedInstanceState);
    }
    // ...other code
}
```



> 在`app/src/main/res/layout`创建   `launch_screen.xml` 文件，如果没有`layout`文件夹就创建一个,内容如下

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>
```



> `app/src/main/res/values/colors.xml`添加一个primary_dark变量，没有这个文件就创建一个

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
</resources>
```

> android/app/src/main/res/values/styles.xml 打开，添加<item name="android:windowIsTranslucent">true</item>
> 文档中还写了使用变量定义启动图风格，这里忽略，详见 [文档](https://github.com/crazycodeboy/react-native-splash-screen#android)

```
<resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <!--设置透明背景-->
        <item name="android:windowIsTranslucent">true</item>
        <!-- 如果要定义初始状态栏颜色 这个选项未加入项目 -->
        <color name="status_bar_color"><!-- 颜色 --></color>
    </style>
</resources>
```

> /android/app/src/main/res添加文件夹 里面放一张launch_screen的图片

```
drawable  //这个文件夹存在也要放一张默认的，找不到对应的屏幕时使用他
drawable-ldpi
drawable-mdpi
drawable-hdpi
drawable-xhdpi
drawable-xxhdpi
drawable-xxxhdpi
```

