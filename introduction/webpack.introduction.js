const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HOST_PATH=__dirname;
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const join=(...args)=>path.join(HOST_PATH,...args);
const VmdPlugin = require("@ztwx/vue-md-loader/lib/vmd.plugin");
const {ManageTempalteWatchDir}=require("@ztwx/auto-template");

if(process.env.NODE_ENV==="dev") new ManageTempalteWatchDir().watch(join("src"));

const envConfig={
  "dev":{
      env:"development",
      title:"introduction",
      base_url:"/",
  },
    "prod":{
      env:"production",
        title:"introduction",
        base_url:"/"
    }
};
const {env,base_url,title}=envConfig[process.env.NODE_ENV];

const isDev=env==="development";
console.log("environment:",env);
console.log("isDev",isDev);
const DIST_PATH=join("dist");

module.exports={
    mode:env==="prod"?"production":"development",
    entry:join("src/main.ts"),
    output:{
        filename:"[name].[hash].js",
        path:DIST_PATH,
        publicPath:base_url
    },
    devServer:{
        index:join("index.html"),
        contentBase:join("assets"),
        contentBasePublicPath:"/assets",
        port:9000,
        publicPath:base_url,
        historyApiFallback:true
    },
    devtool:"eval-source-map",
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:[
                    {loader:"vue-loader"}
                ]
            },
            {
                test:/\.v\.md$/,
                use:[
                    "@ztwx/vue-md-loader"
                ]
            },
            {
                test:/\.js$/,
                // resourceQuery:/ztwx-fire-ui/,
                exclude:/node_modules/,
                use:[
                    {loader:"babel-loader"}
                ]
            },
            {
                test:/\.ts$/,
                exclude:/node_modules/,
                use:[
                    {
                      loader:"babel-loader",
                    },
                    {loader:"ts-loader",
                        options:{
                            configFile:join("tsconfig.introduction.json"),
                            transpileOnly:true,
                            appendTsSuffixTo:['\\.vue$'],
                            happyPackMode:false
                        }
                    }
                ]

            },
            {
                test:/\.css$/,use:["style-loader","css-loader"]
            },
            {
                test:/\.scss$/,use:[
                    // "style-loader",
                    isDev?"vue-style-loader":MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test:/\.(woff|woff|eot|ttf|otf)/,
                use:[
                    {loader:"file-loader",options:{name:"fonts/[name].[hash].[ext]",publishPath:DIST_PATH}}
                ]
            },
            {
                test:/\.css$/,
                oneOf:[
                    {resourceQuery: /\?vue/,use:[
                            {loader:"vue-style-loader",options:{
                                sourceMap:false,
                                shadowMode:false,
                            }},{
                              loader:"css-loader",options:{
                                    sourceMap:false,
                                    importLoaders:2
                            }},
                            {
                                loader:"postcss-loader"
                            }
                        ]},
                    {use:["vue-style-loader","css-loader","postcss-loader"]
                    }
                ]
            },
            {
                test:/.tsx/,
                use:[
                    "babel-loader",
                    {
                        loader:"ts-loader",
                        options:{
                            transpileOnly: true,
                            happyPackMode: false,
                            appendTsxSuffixTo: [
                                '\\.vue$'
                            ]
                        }
                    }
                ]
            }
        ],
    },
    resolve:{
        extensions:[".ts",".tsx",".js"]
    },
    plugins:[
        new VueLoaderPlugin(),
        new VmdPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:"index.html",
            title,
            template:join("index.html"),
            meta:{
                "theme-color":"red"
            },
            base_url
        }),
        new MiniCssExtractPlugin({
            filename: "main.[hash].css"
        })
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                commons:{
                    name:"vendor",
                    test:/[\\/]node_modules[\\/]/,
                    priority:-10,
                    chunks:"all"
                }
            }
        }
    }

};