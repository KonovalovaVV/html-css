const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const outputDirectory = path.join(__dirname, 'dist');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: outputDirectory,
  },

  devServer: {
    compress: true,
    port: 9000,
    contentBase: outputDirectory,
  },
  watch: true,
  module: {
    rules: [{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          outputPath: 'img',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          outputPath: 'font',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};