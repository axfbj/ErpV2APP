/**
 * 验证是否是json格式的字符串
 * @param {string} str string
 * @returns {boolean}
 */
export function isJSON(str) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
/**
 * 判断输入的字符串是否为一个合法的地址格式
 * @param {string} urlStr
 * @returns {boolean}
 */
export function isValidUrl(urlStr) {
  const pattern = /^(http|https):\/\/([\w.]+\/?)\S*$/
  return pattern.test(urlStr)
}

export function validateString(inputString) {
  // 定义正则表达式
  const regex = /^[^#$?*]*\/(mapp|mlogin\.jsp)$/

  // 使用正则表达式进行匹配
  const isMatch = regex.test(inputString)

  // 返回验证结果
  return isMatch
}
