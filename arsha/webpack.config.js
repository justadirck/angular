"use strict";

const fs = require("fs");
const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Look for .html files
var htmlFiles = [];
var directories = ["src"];
while (directories.length > 0) {
  var directory = directories.pop();
  var dirContents = fs
    .readdirSync(directory)
    .map((file) => path.join(directory, file));

  htmlFiles.push(...dirContents.filter((file) => file.endsWith(".html")));
  directories.push(
    ...dirContents.filter((file) => fs.statSync(file).isDirectory())
  );
}

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist/"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: "style-loader",
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  // devServer: {
  //   static: path.resolve(__dirname, 'dist'),
  //   port: 8080,
  //   hot: true,
  // },
  plugins: [
    // Build a new plugin instance for each .html file found
    ...htmlFiles.map(
      (htmlFile) =>
        new HtmlWebpackPlugin({
          template: htmlFile,
          filename: htmlFile.replace(path.normalize("src/"), ""),
          inject: false,
        })
    ),
  ],
};
