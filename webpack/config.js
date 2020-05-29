const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const baseDir = path.join(__dirname, '..');

module.exports = {
  context: baseDir,
  // Chosen mode tells webpack to use its built-in optimizations accordingly
  mode: devMode ? 'development' : 'production',
  // Here the application starts executing and webpack starts bundling
  entry: {
    main: ['./static/js/main.js', './static/sass/main.scss'],
  },
  // Options related to how webpack emits results
  output: {
    // The target directory for all output files (must be an absolute path)
    path: path.join(baseDir, 'public/static/dist'),
    filename: '[name].js', // for multiple entry points
    // The url to the output directory resolved relative to the HTML page
    publicPath: '/static/dist/',
  },
  // Config regarding modules
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2, sourceMap: devMode } },
          { loader: 'postcss-loader', options: { sourceMap: devMode } },
          { loader: 'sass-loader', options: { sourceMap: devMode } },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    alias: {
      // alias "@" -> "/static" and "@/path/file" -> "/static/path/file"
      '@': path.join(baseDir, 'static'),
    },
  },
  optimization: {
    minimizer: [
      // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      // https://github.com/NMFR/optimize-css-assets-webpack-plugin
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    // https://webpack.js.org/plugins/dll-plugin/
    new webpack.DllReferencePlugin({
      manifest: path.join(baseDir, 'public/static/dist/vendor-dll-manifest.json'),
    }),
    // https://github.com/Va1/browser-sync-webpack-plugin
    new BrowserSyncPlugin({
      files: ['dist/**/*.+(css|js)', '*.php', 'templates/**/*.twig'],
      proxy: 'http://craftstarter.ups.dock',
      injectChanges: true,
      open: false,
      ghostMode: false,
      notify: false,
    }),
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devtool: devMode ? 'inline-source-map' : false,
};
