const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    content: './src/index.jsx',
    background: './src/background/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    historyApiFallback: true,  // This ensures all routes fallback to index.html
  },
  module: {
    rules: [{ 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', ['@babel/preset-react', { "runtime": "automatic" }]]
            }
        }
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
      }
    }],
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
  }),
  
 ],
};

