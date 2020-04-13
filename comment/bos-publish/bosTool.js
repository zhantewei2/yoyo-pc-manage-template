const {bucket,client}=require("./bos.js");
const path=require("path");
const zlib=require('zlib');
const fs=require('fs');
const {getContentType} =require('./readFile');
const {MD5_HEADER}=require("./setting");
const chalk=require("chalk");

const progressBar=require("crimson-progressbar");


const setBar=(current,total,content="")=>{
    progressBar.renderProgressBar(current,total,"green","red","■","□",true);
};

/**
 * type
 * suffix
 * absPath
 * relPath
 * fileName
 * md5
 */
const runUpload=async(opt)=>{
    if(opt.type=='dir')return;
    const uploadName=path.join(opt.relPath,opt.fileName).replace(/\\/g,'/');
    const contentType=getContentType(opt.suffix);

    const baseHeader={
        "Content-Type":contentType,
        "Expires":0,
    };
    baseHeader[MD5_HEADER]=opt.md5;

    if(['js','css','html'].indexOf(opt.suffix)>=0){
        const content=fs.readFileSync(opt.absPath);
        const contentGzip=zlib.gzipSync(content);
        await client.putObject(bucket,uploadName,contentGzip,{
            "Content-Encoding":"gzip",
            ...baseHeader
        })
    }else{
        await client.putObjectFromFile(bucket,uploadName,opt.absPath,baseHeader)
    }
};

const runRemove=async(key)=>{
    try {
        await client.deleteObject(bucket, key);
    }catch(e){
        console.error(chalk.red(key),`删除失败`);
    }
};

exports.runUpload=runUpload;
exports.setBar=setBar;
exports.runRemove=runRemove;