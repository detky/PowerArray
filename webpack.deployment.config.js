/// <binding />
"use strict";
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
console.log('__dirname:' + __dirname);
module.exports = env => {
    console.log('env: ', env); // 'local'
    return {
        entry: "./PowerArray.js",
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'PowerArray.min.js'
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    sourceMap: true,
                     terserOptions: {
                        compress: {
                            pure_funcs: ['OnlyDev','console.log', 'console.info']
                        }
                    //     pure_funcs: ['console.debug','console.log']
                     }
                })
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(mjs|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['react']
                            }
                        }
                    ],
                },
                // JSon file handling
                { test: /\.json$/, loader: 'json-loader' }
            ]
        },
        mode: 'production',
        plugins: [
            
        ]
    }
};