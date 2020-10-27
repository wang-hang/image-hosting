const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const theme = require('./theme')
const path = require('path')

const paths = require('./paths')
const config = require('./config')

module.exports = {
  target: 'electron-renderer',
  output:{
    filename: paths.outputFileName,
    publicPath: paths.publicPath,
    path: paths.outputDir,
  },
  resolve:{
    alias: config.alias,
    extensions: config.extensions,
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {hmr: !isProd},
          },
          'css-loader'
        ],
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {hmr: !isProd},
          }  
          ,
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {hmr: !isProd},
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  // 'primary-color': "red",
                  ...theme,
                }
              }
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        use:['ts-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options:{
          name: '[name].[ext]'
        }
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: paths.templateHtml,
      // filename: paths.outputHtml,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new ProgressBarPlugin(),
  ]
}