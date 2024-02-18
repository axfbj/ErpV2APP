import { Platform } from 'react-native'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'

/**
 * 下载并检查是否有同名文件，有就删除之后下载打开预览，有就直接打开预览
 * @param {string} fileUrl 文件的url下载地址
 * @param {string} fileName 下载后的文件名
 */
export function downloadAndOpenFile(fileUrl, fileName) {
  // 确定下载目录
  const downloadDir = Platform.select({
    android: RNFS.DownloadDirectoryPath,
    ios: RNFS.DocumentDirectoryPath,
  })

  // 下载文件路径
  const filePath = `${downloadDir}/${fileName}`

  // 检查文件是否存在
  RNFS.exists(filePath)
    .then((exists) => {
      if (exists) {
        // 如果文件已存在，删除文件
        return RNFS.unlink(filePath)
      } else {
        // 如果文件不存在，不需要执行删除操作
        return Promise.resolve()
      }
    })
    .then(() => {
      // 执行文件下载
      const downloadOptions = {
        fromUrl: fileUrl,
        toFile: filePath,
        // 将保存的 Cookie 添加到请求头中
        // headers: { Cookie: cookieString },
        // background: true, // 后台下载不阻塞 大文件有用
        // progressDivider: 1, // 如果将 progressDivider 设置为 10，则每下载 10% 的数据时，将触发一次进度更新
        // progress: (data) => { // 进度更新函数
        //   const progress = data.bytesWritten / data.contentLength
        //   console.log('Download progress:', progress)
        //   console.log('RNFS', RNFS)
        // },
      }
      return RNFS.downloadFile(downloadOptions).promise
    })
    .then(() => {
      // 使用 FileViewer 打开文件
      FileViewer.open(filePath)
        .then(() => {
          // console.log('文件打开成功')
        })
        .catch((error) => {
          console.log('文件打开失败', error)
        })
    })
    .catch((error) => {
      console.log('文件下载失败:', error)
      // 处理下载失败的情况
    })
}
