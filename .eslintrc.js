module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-native', 'html', 'react-hooks'],
  globals: {
    module: true,
  },
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    semi: [0],
  },
}
