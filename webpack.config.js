module.exports = {
  entry: __dirname + '/src',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devtool: 'eval-source-maps',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
}
