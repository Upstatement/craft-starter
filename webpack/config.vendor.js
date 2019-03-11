const path = require('path');
const webpack = require('webpack');

const baseDir = path.join(__dirname, '..');

module.exports = {
  context: baseDir,
  mode: 'production',
  entry: {
    vendor: ['autoprefixer', 'jquery', 'lazysizes'],
  },
  output: {
    path: path.join(baseDir, 'public/static/dist'),
    filename: 'vendor.js',
    library: 'vendor_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_[hash]',
      path: path.join(baseDir, 'public/static/dist/vendor-dll-manifest.json'),
    }),
  ],
};
