// requirements in the config file for webpack to work
const path = require('path')
const webpack = require('webpack')

const HtmlWebPackPlugin = require("html-webpack-plugin") // plugin to create a distribution folder compatible index.html file with all the relevant deployable js file dependencies
// workbox for offline loading of the application
const WorkboxPlugin = require('workbox-webpack-plugin');

// configurations are added here as either modules or plugins
module.exports = {
    // entry point for webpack to start building its depdendency tree
    entry: './src/client/index.js',
    mode: 'production', // running mode is prod
    module: {
        rules: [
            { // test regex for the babel loader to start building the js files
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            { // loader for converting sass to css files during build phase
                test: /.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html", // source file for webpack html creation
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW()
    ],
    output: { // to have js event listening and other functionalities enabled through the client library
        libraryTarget: 'var',
        library: 'Client'
    },
}
