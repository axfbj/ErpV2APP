module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    eqeqeq: 'error', // 强制使用 === 和 !==
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'no-extra-semi': 'error', // 不允许有多余的分号
    'react/react-in-jsx-scope': 'error', // 确保在 JSX 中正确导入了 React 库
    'react/jsx-filename-extension': ['error', { extensions: ['ts', 'tsx', '.js', '.jsx'] }], // 表示只允许具有写在 extensions 扩展名的文件包含 JSX 语法。
    'no-use-before-define': 'off',
    'no-unused-vars': [
      'off',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': ['error', 'never'], // 在函数参数列表前不需要空格
  },
}
