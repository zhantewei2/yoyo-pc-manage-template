const path =require("path");
const join=(...args)=>
    path.resolve(__dirname,...args);

const host_path=process.cwd();

const current_env=process.env.NODE_ENV;


/**
 * append watch dir
 */
try {
    require("@ztwx/check-package")();
}catch(e){
    console.warn("Not found @ztwx/check-package .auto installing");
    require("child_process").spawnSync(process.platform==="win32"?"yarn.cmd":"yarn",["install"],{stdio:"inherit"});
}
const {ManageTempalteWatchDir}=require("@ztwx/auto-template");

if(current_env==="dev") new ManageTempalteWatchDir().watch(path.join(host_path,"src"));

module.exports={
    productionSourceMap:false,
    chainWebpack:config=>{
        //环境配置
        // config.resolve.alias
        //     .set("@config",join("src/envs/config.dev.ts"));
        config.resolve.alias
            .set("@config",join(`src/envs/config.${current_env}.ts`))
            .set("@ice",join("src/ice.ts"))
            .set("@types",join("src/components/types/types.ts"));

        config.module
            .rule("fonts")
            .use("url-loader")
            .loader("url-loader")
            .tap(opt=>({...opt,limit:1}));

        config.plugins.delete("prefetch");
        config.plugins.delete("preload");
        // config.plugins.delete("extract-css");

    },
    pages:{
        index:{
            entry:"src/main.ts",
            template:"public/index.html",
            filename:"index.html",
            title:"ASMP",
            chunks:["chunk-vendors","chunk-common","index"]
        },
        
    },
    devServer: {
        proxy: {
            '/devTest/asmpcloud-aftersale': {
                /* 目标代理服务器地址 */
                target: 'http://192.168.0.138:11003',
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite:{"^/devTest/asmpcloud-aftersale":""}
            },
            '/devTest/asmpcloud-maindata': {
                /* 目标代理服务器地址 */
                target: 'http://192.168.0.138:11333',
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite:{"^/devTest/asmpcloud-maindata":""}
            },

        },
    },
};