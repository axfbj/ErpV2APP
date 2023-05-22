# react-native-webview配置

> Android和ios不需要多鱼的配置，但是运行的网页兼容性差，需要用vite工具处理 

1. 安装工具

   ```bash
   npm install vitejs/plugin-legacy --save-dev
   ```

2. vite.config.ts 添加
   ```
     plugins: [
   	// ...
       // 兼容webview 在react-native套壳中使用，开发时注释节省编译时间
       legacy({
         targets: ['Chrome 64'],
         modernPolyfills: true,
       })
       // ...
      ]
   ```

   





