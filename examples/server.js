const initRouter = require('./router')
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const path = require('path')

require('./server2.js')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(cookieParser())

app.use(
  multipart({
    uploadDir: path.resolve(__dirname, 'upload-file')
  })
)
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN-D', '1234abc')
    }
  })
)

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

//初始化路由
initRouter(router, app)

const port = process.env.PORT || 8088
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
