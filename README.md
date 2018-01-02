# 實作練習

## 建立專案 & 安裝 webpack

```bash
$ mkdir webpack-demo
$ cd webpack-demo
$ npm init -y
$ npm i webpack -D
```

## 處理 JavaScript 和專案架構

```bash

# 2. 一步一步來，我們先處理 JavaScript 和專案架構
# 2-1 建立 index.html
# 2-2 建立 src/index.js
$ open .

$ python -m SimpleHTTPServer
```

## 第一次使用 webpack 打包

```bash
$ npm i lodash -S
# 修改 index.js 使用 import
# 因為我們將要使用 webpack 來封裝程式，所以 index.html 的路徑要調整
$ npx webpack src/index.js dist/index.js

# 檢視結果
$ open .

$ python -m SimpleHTTPServer

# 其他工具
$ npm i http-server
$ npx http-server
```

## 使用設定檔 webpack.config.js

```bash
# 新增 webpack.config.js
$ npx webpack --config webpack.config.js

# 搭配 npm scripts
$ npm run build
```

## 支援 ES2015

```bash
# https://babeljs.io/docs/setup/#installation
# https://webpack.js.org/loaders/babel-loader
# NOTE: 文件更新的問題導致我們很多時候需要兩邊參照

$ npm i babel-loader babel-core babel-preset-env -D
# 有兩種設定 babel 的方式
# .babelrc
# webpack.config.js loader 設定
# 測試使用 ES2015

# 搭配 webpack-dev-server
$ npm i webpack-dev-server -D
# 加上 npm scripts
$ npm run dev

# babel-loader 注意事項
# b-1. 不要處理 node_modules 裡面的檔案
# b-2. 預設會在每隻編譯的檔案注入一些協助轉換的 helper，如果每隻檔案都注入那程式碼就會快速變大。
#      因此需要 babel-plugin-transform-runtime
$ npm i babel-plugin-transform-runtime -D
# webpack.config.js 補上 plugins 設定
```

## 處理其他類型的檔案 - 先從支援 CSS 開始

```bash
$ npm i style-loader css-loader -D
# 設定 webpack.config.js
# 加入 css 測試
```

## 處理圖片

```bash
$ npm i file-loader -D
# 設定 webpack.config.js
$ npm run dev
$ npm run build # 觀察編譯結果
```

## 處理字體

```bash
$ npm i url-loader -D
# 設定 webpack.config.js
# 這邊單純只是示範，事實上圖片比較適合使用 url-loader 轉換成 base64
```

## 處理其他檔案

```bash
$ npm i excel-loader -D
# 設定 webpack.config.js
# 其他檔案以此類推
```

## 理解 entry 設定

```bash
# 其實 webpack 還可以做到更多 - 輸出管理的部分：多個 entrypoint
# entry 有三種參數形式可以搭配 [name]
# 1. 字串: 指定單一 entry point 匯出一個 bundle, [name] = main
# 2. 陣列: 彙整多個檔案匯出一個 bundle, [name] = main
# 3. 物件: 匯出多個 bundle, 必須搭配 [name] = object property

# webpack context 執行環境(或指設定參數)，即 webpack 載入/解析檔案時相對路徑的根目錄環境(起點)
# 預設（沒有設定時）為執行指令（webpack）所在的那個目錄
# 假如，我們在 src/ 目錄下執行 npx webpack --config=../webpack.config.js -> context = webpack-demo/src/
# __dirname 檔案所在的目錄絕對路徑
```

## 清理 /dist

```bash
# 你應該也注意到了，每次我們編譯的結果輸出到 /dist 是不會清除的，只會把同名的檔案覆蓋
# 其他的檔案會持續保留
# 在開發過程中，這可能導致我們搞錯
$ npm i clean-webpack-plugin -D
# 加入 plugin 設定到 webpack.config.js
```

## Tree Shaking

Tree Shaking 一般在提到 JavaScript 的情況下指的是把沒用到的程式碼移除，不過這個功能必須搭配 ES2015 的 `import` 和 `export`

> 最好使用 .babelrc 因為有些 babel 支援的參數，babel-loader 的 options 可能不支援
> 上面這個結論針對 babel-loader v7.x

```bash
# 加入 `src/math.js` 檔案
# 為了觀察，我們將 index.js 中不必要的程式碼先移除
# 我們在 index.js 並沒有 import square, Tree shaking 應該要把沒用到的 code 移除（換句話說應該不要輸出到編譯檔案）
# 因為有些 babel 支援的參數，babel-loader 的 options 可能不支援。改用 .babelrc
$ npm run build

# 觀察輸出的編譯檔案, square 還是被包含在 code 了 只是沒有匯出, 但沒有被移除
# 使用 uglifyjs-webpack-plugin
$ npm i uglifyjs-webpack-plugin -D
# 修改設定
```

#### .babelrc

```babelrc
{
  "presets": [
    ["env", {
      "modules": false // 重要：要支援 Tree-Shaking 須設定這個參數
    }]
  ],
  "plugins": ["transform-runtime"]
}
```

## 安裝 Bootstrap

```bash
# 實務練習 - 查詢版本
$ npm view bootstrap versions
# 安裝
$ npm i bootstrap@4.0.0-beta.3
$ npm i jquery popper.js # 相依
# 修改 src/index.js 匯入 bootstrap

# 為了編譯 Bootstrap 的 SCSS 我們需要 sass-loader, postcss-loader
$ npm i sass-loader node-sass postcss-loader precss autoprefixer -D
# 修改 webpack.config.js
# 在 index.js 匯入 scss
# sass-loader 使用 node-sass 客製的載入機制使用 `~` 代表 node_modules 的路徑
# @import "~bootstrap/dist/css/bootstrap";

# 進階用法
$ npm i exports-loader -D
```

Bootstrap 進階用法，各別載入單獨的元件需要使用 `exports-loader`。下面為 webpack.config.js 設定 plugins

為什麼這個範例需要 Util，觀察原始碼[看看該元件相依的檔案](https://github.com/twbs/bootstrap/blob/v4-dev/js/src/dropdown.js)

```js
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  jquery: 'jquery',
  'window.jQuery': 'jquery',
  Popper: ['popper.js', 'default'],
  // In case you imported plugins individually, you must also require them here:
  Util: "exports-loader?Util!bootstrap/js/dist/util",
  Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
})
```

> [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) 自動載入，例如：程式碼中出現 `$` 就自動載入
> 如果某個函式庫建立了 global 的變數，exports-loader 可以協助將其加入 exports[...]
