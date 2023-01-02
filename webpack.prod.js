const { merge } = require('webpack-merge');
const config  = require('./webpack.config.js');
//import { merge } from 'webpack-merge';

module.exports = merge(config, {
    mode: 'production',
});