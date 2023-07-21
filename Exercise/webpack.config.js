const path = require('path');

module.exports = {
  mode: 'development',
  entry: '.Exercise.js',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    port: 4000,
    host: 'localhost',
    static: path.resolve(__dirname, 'dist'),
    proxy: {
      '/api': {
        target: 'https://u-topic-0-383623.uc.r.appspot.com/',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      },
    },
    allowedHosts: ['sepher.ddnsking.com'],
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.js', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
