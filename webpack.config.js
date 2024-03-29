const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract=new ExtractTextPlugin('styles.css');
console.log("inn")
    return {
        entry: ['babel-polyfill','./src/index.js'],
        output: {
            path: path.join(__dirname, "public",'dist'),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                   use:[
                       { loader:'css-loader',
                       options:{
                           sourceMap:true
                       }
                    }  ,
                        {
                          loader:'sass-loader' ,
                          options:{
                              sourceMap:true
                          } 
                        }

                   ] 
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
              }   
        ]
        },
        plugins:[
            CSSExtract
        ],
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath:'/dist/'
        }

    };
};

