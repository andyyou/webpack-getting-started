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
