# @react-navigation/native

> 安装 一整套的运行插件

```bash
yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context
yarn add @react-navigation/native-stack
```

> react-native-screens需要添加一些内容

1. android/app/src/main/java/<your package name>/MainActivity.java

   ```java
   public class MainActivity extends ReactActivity {
     // ...
     @Override
     protected void onCreate(Bundle savedInstanceState) {
       super.onCreate(null);
     }
     // ...
   }
   ```

   ```java
   import android.os.Bundle; //加在最上面
   ```

   

   

