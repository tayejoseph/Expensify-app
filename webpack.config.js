//console.log(__dirname);

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = (env) => {
const isProduction = env === "production";
const CSSExtract = new ExtractTextPlugin('styles.css');

return {
//this your original js file
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, 'public'),
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
        CSSExtract
    ],
//this is a webpack feature that helps detact the source
//of the component that has the error   
    devtool: isProduction ? "source-map" : 'inline-source-map',
//the is used to live the index.html file that is to be served 
//you must install the yarn add webpack-dev-server@2.5.1 before you can used it
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};


}
//console.log(path.join(__dirname, 'script'))
//You must install webpack before this code can work
