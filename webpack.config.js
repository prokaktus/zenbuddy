const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';


const srcPath = path.resolve('frontend');


const exportsModule = {
    entry: {
        main: path.join(srcPath, 'index.js'),
    },
    output: {
        path: path.resolve('zenbuddy', 'static', 'build'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use:
                //         [
                //           { 
                //             loader: 'css-loader', 
                //             options: { 
                //                 importLoaders: 1,
                //                 minimize: env === 'production' ? true : false,
                //                 url: false
                //             }
                //           },
                //           'postcss-loader'
                //         ]
                // })
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css', 
            chunkFilename: '[id].css'
        }),
        require('precss'),
        require('autoprefixer')
    ],
    devtool: isProduction ? 'source-map' : 'eval-source-map'
};

if (env === 'production') {
    exportsModule.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    );
}


module.exports = exportsModule;
