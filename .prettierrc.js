module.exports = {
  printWidth: 120,  // 超过最大值换行
  tabWidth: 2, // tab缩进大小,默认为2
  useTabs: false, // 缩进不使用tab，使用空格，默认为false
  semi: false, // 在每条语句的末尾添加一个分号 默认true
  singleQuote: true, // 使用单引号代替双引号 默认false
  quoteProps: 'as-needed', // 引用对象中的属性，对象key添加引号方式  as-needed仅在需要时在对象属性周围添加引号
  bracketSpacing: true,  // 在对象文字中的括号之间打印空格
  trailingComma: 'es5',  // 有效的尾随逗号 es5 中有效的尾随逗号(默认) | none 没有逗号 | all 尾随逗号
  jsxBracketSameLine: false, // 尖括号与标签的起始位置在同一行。
  jsxSingleQuote: false, // 在 JSX 属性中使用单引号
  arrowParens: 'always', // 箭头函数参数周围包含括号 always有括号(默认) avoid无括号
  requirePragma: false, // 只对包含特殊注释@prettier进行格式化
  proseWrap: 'never', // 用于控制长文本或代码行的换行方式。
  htmlWhitespaceSensitivity: 'strict', // 保留 HTML 和 CSS 之间的空白符
  endOfLine: 'auto',// 结尾是 \n \r \n\r auto
}
