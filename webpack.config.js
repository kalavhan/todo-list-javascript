const path = require('path');

module.exports = {
  entry: './src/',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};