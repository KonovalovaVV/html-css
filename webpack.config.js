const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const outputDirectory = path.join(__dirname, 'dist');
const sourceDirectory = path.join(__dirname, 'src');

module.exports = {
  entry: path.join(sourceDirectory, 'index.js'),
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
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
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
      template: path.join(sourceDirectory, 'index.html')
    }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production',
      pngquant: {
        quality: '95-100'
      }
    })
  ]
};