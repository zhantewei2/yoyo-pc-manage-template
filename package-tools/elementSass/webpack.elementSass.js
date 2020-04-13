const webpack=require("webpack");
const path=require("path");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const fs=require("fs");
const host_path=path.resolve(__dirname,"");
const join=(...args)=>path.join(host_path,...args);

const DIST_PATH=join("dist");
const TARGET_PATH=join("../../public/css");


const copyFile=()=>{
    const fileList=fs.readdirSync(DIST_PATH);
    fileList.forEach(name=>{
        const extMatcher=name.match(/\.(\w+)$/);
        if(extMatcher){
            const ext=extMatcher[1];
            if(["css","ttf","woff"].indexOf(ext)>=0){
                fs.copyFileSync(
                    path.join(DIST_PATH,name),
                    path.join(TARGET_PATH,name)
                )
            }
        }
    })
};

webpack({
    mode:"production",
    entry:join("/elementSass.js"),
    output:{
        filename:"elementSass.js",
        path:join("dist")
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },{
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    {loader:"file-loader",
                        options:{
                            name:"[name].[ext]",
                            publishPath:join("dist")
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"element.css",
            chunkFilename:'[id].css'
        })
    ]
},(err,stats)=>{
    if(err)return;
    copyFile();
});
