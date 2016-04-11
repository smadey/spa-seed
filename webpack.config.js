var path = require('path')
var webpack = require('webpack')

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
]

module.exports = {
  entry: {
    docs: './docs/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'docs'),
        ]
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'docs'),
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader?root=./src/'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'eval-source-map',
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  postcss: function () {
    return [require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }), require('precss')];
  },
  vue: {
    loaders: {
      js: 'babel-loader!eslint-loader?`{rules:{eol-last:0}}`'
    }
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.entry = {
    'vue-components': './src/index.js'
  }
  module.exports.output.library = 'vc'
  module.exports.output.libraryTarget = 'umd'
  module.exports.devtool = 'source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
