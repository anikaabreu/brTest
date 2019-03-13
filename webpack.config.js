const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: {
        app: ['./js/main.js']
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2017']
                }
            },
            {
                test: /\.html$/,
                loader: 'underscore-template-loader'
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'autoprefixer', 'sass']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'autoprefixer']
            },
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/js'),
        publicPath: '/public/'
    },
    resolve: {
        modulesDirectories: ['js', 'views', 'node_modules'],
        modules: [
            __dirname, 'app', 'node_modules', path.resolve(__dirname, 'public')
        ]
    }
};