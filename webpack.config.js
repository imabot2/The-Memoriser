const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");



module.exports = {

  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: "eval-source-map",
  watch: true,
  mode: "development",
  //mode: 'production',


  // The entry point file described above
  entry: {
    bundle: ['./src/js/index.js']
  },

  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },

  resolve: {
    alias: {
      Assets: path.resolve(__dirname, "src/assets/"),
      Quizzes: path.resolve(__dirname, "src/quizzes/"),
      Js: path.resolve(__dirname, "src/js/")
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        //exclude: /\.lazy\.css$/i,
        //exclude: /theme-[A-Za-z]+\.css$/i,
        exclude: /themes(\/|\\)theme-[A-Za-z]+\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 20000, // Convert images < 20kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
          },
        ],
      },
      {
        test: /\.mp3$/,
        type: "asset/inline", //'url-loader'
      },
      {
        //test: /\.lazy\.css$/i,
        //test: /theme-[A-Za-z]+\.css$/i,
        test: /themes(\/|\\)theme-[A-Za-z]+\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "lazySingletonStyleTag" },
          },
          "css-loader",
        ],
      },

    ],
  },

  plugins: [

    // Copy static assets  
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/static/', // src location
          to: 'static',               // destination location in dist folder
        },
        {
          from: 'src/assets/static/favicon/favicon.ico',
          to: 'favicon.ico',
        },
        {
          from: 'src/assets/static/favicon/apple-touch-icon.png',
          to: 'apple-touch-icon.png',
        },
        {
          from: 'src/assets/static/favicon/apple-touch-icon.png',
          to: 'apple-touch-icon-precomposed.png',
        },
        
      ],
      options: { concurrency: 100, },
    }),

    // Minify HMTL
    new HtmlWebpackPlugin({
      title: 'thememoryzer',
      template: './src/index.html',
    }),

    // Minify CSS
    new MiniCssExtractPlugin(),


  ]

};