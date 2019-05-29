const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SRC_DIR = path.join(__dirname, '/client');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: {
    // vendor: ["styled-components"],
    // bookingPortal: `${SRC_DIR}/booking-portal-module/client/src/index.jsx`,
    // photoDisplay: `${SRC_DIR}/photodisplay-module/client/src/Components/index.jsx`,
    // reviews: `${SRC_DIR}/Review-module/client/src/index.jsx`,
    // infoListing: `${SRC_DIR}/listinginfo-module/Module/client/src/index.jsx`,
    path: `${SRC_DIR}/index.jsx`
  },
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // modules: [
    //   path.resolve(__dirname, 'node_modules'),
    // ],
    alias: {
      // 'styled-components': require.resolve('styled-components')
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components')
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: Infinity,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          reuseExistingChunk: true,
        },
      }
    },
  },
  // plugins: [
  //   new BundleAnalyzerPlugin(),
  // ],
};
