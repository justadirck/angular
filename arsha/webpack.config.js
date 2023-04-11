'use strict';

const fs = require('fs');
require('dotenv').config();

const path = require('path');
const dotenv = require('dotenv');
const autoprefixer = require('autoprefixer');
const ESLintPlugin = require('eslint-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint options
let options = {};

// Look for .html files
let htmlFiles = [];
let directories = ['src'];
while (directories.length > 0) {
  let directory = directories.pop();
  let dirContents = fs.readdirSync(directory).map((file) => path.join(directory, file));
  htmlFiles.push(...dirContents.filter((file) => file.endsWith('.html')));
  directories.push(...dirContents.filter((file) => fs.statSync(file).isDirectory()));
}

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(`dist/${process.env.project}`),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/[name][ext]' },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // Build a new plugin instance for each .html file found
    ...htmlFiles.map(
      (htmlFile) =>
        new HtmlWebpackPlugin({
          template: htmlFile,
          filename: htmlFile.replace(path.normalize('src/'), ''),
          favicon: 'src/favicon.ico',
          inject: false,
        })
    ),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
    new ESLintPlugin(options),
  ],
  devServer: {
    hot: true,
    port: 8080,
    static: path.resolve(`dist/${process.env.project}`),
  },
};
