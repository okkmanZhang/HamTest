const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.tsx'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },    
    module: {
        rules: [
            { test: /\.(ts|js)x?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    plugins: [new HWP({
            template: path.join(__dirname, '/src/index.html'),
        })]
}