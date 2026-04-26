const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    path.join(__dirname, '../src/front/js/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },

  // REPLACE YOUR COMMENT WITH THIS SECTION:
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // Points to src/front/js/ where index.js and layout.js live
      "@": path.resolve(__dirname, '../src/front/js'),
      // Points to src/component/
      "@component": path.resolve(__dirname, '../src/component'),
      // Points to src/pages/
      "@pages": path.resolve(__dirname, '../src/pages'),
      // Points to src/styles/
      "@styles": path.resolve(__dirname, '../styles'),
      "@store": path.resolve(__dirname, '../src/front/js/store'),
    }
  },


  plugins: [
    new HtmlWebpackPlugin({
      // This is correct as long as template.html is in the 'frontend' folder
      template: path.resolve(__dirname, '../template.html'),
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'), // Explicitly point to the .env file
      safe: true,
      systemvars: true
    })
  ]
};
