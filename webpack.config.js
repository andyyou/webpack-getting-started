// 注意：設定檔本身並為支援 ES2015，視 node 版本而定
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
