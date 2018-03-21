//console.log(__dirname);

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// process.env.NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
require("dotenv").config({ path: ".env.test" });
}else if(process.env.NODE_ENV === 'development'){
require("dotenv").config({ path: ".env.development" });
}

module.exports = (env) => {
const isProduction = env === "production";
const CSSExtract = new ExtractTextPlugin('styles.css');

return {
//this your original js file
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
        path: path.join(__dirname, 'public',"dist"),//this tell web pack to go to our current directory then to public/dist so that it can find the bundle.js file
//this is the one web pack compile
        filename: "bundle.js"
    },
//in the object named model below webpack is telling babel-loader 
//to check inside the bundle file and schould exclude any js file
//that has the name(node_modules)
//you must install babel loader before you can use it
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: CSSExtract.extract({
                use: [
                   {
                       loader: 'css-loader',
                       options: {
                           sourceMap: true
                       }
                   },
                   {
                       loader: "sass-loader",
                       options: {
                           source: true
                       }
                   }
                ]
            })
        }]
    },
    plugins: [
        CSSExtract,
        new webpack.DefinePlugin({
            "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
            "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)

        })
    ],
//this is a webpack feature that helps detact the source
//of the component that has the error   
    devtool: isProduction ? "source-map" : 'inline-source-map',
//the is used to live the index.html file that is to be served 
//+you must install the yarn add webpack-dev-server@2.5.1 before you can used it
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        publicPath: "/dist/"
    }
};


}
//console.log(path.join(__dirname, 'script'))
//You must install webpack before this code can work
