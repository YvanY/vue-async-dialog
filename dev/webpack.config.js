const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = function (env) {
  return {
    entry: './dev/index.js',

    output: {
      path: path.resolve(__dirname, env === 'docs' ? '../docs' : '../dist'),
      publicPath: env === 'docs' ? 'https://yvany.github.io/vue-async-dialog/' : '/',
      filename: '[hash].js'
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },

        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },

        {
          test: /\.css$/,

          use: [
            'vue-style-loader',
            {
              loader: 'css-loader'
            }
          ],

          exclude: /node_modules/
        },

        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
          include: /node_modules/
        },

        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader'
        }
      ]
    },

    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './dev/index.html'
      })
    ],

    resolve: {
      extensions: ['.mjs', '.js', '.json', '.vue']
    },

    devServer: {
      overlay: true
    },

    performance: {
      hints: false
    },

    devtool: '#eval-source-map'
  }
}
