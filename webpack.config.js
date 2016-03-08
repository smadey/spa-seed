var path = require('path')
var webpack = require('webpack')

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
        test: /\.vue$/,
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'docs')
        ]
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'docs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?root=./docs/'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'docs')
        ],
        query: {
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime']
        }
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
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: 'eval-source-map',
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
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
