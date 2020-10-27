const path = require('path')
const config = require('./config')

const env = process.NODE_ENV
const resolve = (value) => path.resolve(__dirname, '../', value)

module.exports = {
  entry: resolve('src/index.tsx'),
  src: resolve('src'),
  templateHtml: resolve('index.html'),
  outputHtml: resolve('dist', 'index.html'),
  styles: resolve('src/css'),
  images: resolve('src/img'),
  outputDir: resolve('dist'),
  publicPath: resolve('/'),
  outputFileName: env === 'production' ? '[name][hash:6].js': '[name].js',
  components: resolve('src/components'),
}