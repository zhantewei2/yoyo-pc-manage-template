//检查依赖
require("./checkDependecies")();

const {bucket,client}=require("./bos.js");
const {readDir,getFileMd5,dir} =require("./readFile");
const path=require("path");
const fs=require("fs");
const chalk=require("chalk");
const {MD5_HEADER,ENV_TEXT} =require("./setting");
const {setBar,runUpload,runRemove} =require("./bosTool");

const env=process.argv[2];
const title=ENV_TEXT[env];

console.log(chalk.yellow("当前发包环境：",chalk.red(title)));

HOST_PATH=process.cwd();


const getBosList=async()=>{
    console.log("获取bos对象");
  const res=await client.listObjects(bucket);
  const list=res.body.contents;
  const listSize=list.length;

  console.log('bos对象数：',chalk.red(listSize));
  console.log("bos对象分析中...");
  let md5;
  let nowIndex=0;
  for(let i of list){
      try {
          const metaRes=await client.getObjectMetadata(bucket, i.key);
          setBar(++nowIndex,listSize,i.key);
          md5=metaRes['http_headers'][MD5_HEADER];
          i['md5']=md5;
          i['owner']=undefined;
      }catch(e){
          console.log(e);
          console.error(chalk.red(`${i.key} getObjectMetadata error`))
      }
  }
  console.log("\n");
  return list;
};
const getNativeList=async()=>{
  const nativeList=[];
  readDir(dir,"",true,file=>{
      if(file.type=="dir")return;
      file.bosPath=path.join(file.relPath,file.fileName);
      nativeList.push(file)
  })
  return nativeList;
};

const bosPublish=async()=>{
    try {

        // let content=fs.readFileSync("./bos.txt","utf8");
        // let bosList=JSON.parse(content);
        const bosList=await getBosList();
        const nativeList=await getNativeList();
        console.log("本地文件数",chalk.red(nativeList.length));
        console.log("比较中....");
        let nativeKey;
        let bosKey;
        let bosAdd;
        let bosRemove;
        //更新文件
        let updateCount=0;
        const updateList=[];
        //新增文件
        let addCount=0;
        const addList=[];
        //删除文件
        let removeCount=0;
        const removeList=[];
        //处理需要修改和新增的bos文件
        for(let nativeFile of nativeList){
            nativeKey=nativeFile.bosPath;
            bosAdd=true;
            for(let bosFile of bosList){
                bosKey=bosFile.key;
                if(nativeKey===bosKey){
                    bosAdd=false;
                    //如果bos文件md5 不等于本地文件md5，则更新bos文件
                    if(nativeFile.md5!==bosFile.md5){
                        updateCount++;
                        updateList.push(nativeFile);
                    }
                }
            }
            //如果bos不存在该文件,新增文件
            if(bosAdd){
                addCount++;
                addList.push(nativeFile);
            }
        }
        //处理需要删除的bos文件
        for(let bosFile of bosList){
            bosRemove=true;
            bosKey=bosFile.key;
            for(let nativeFile of nativeList){
                if(bosKey===nativeFile.bosPath)bosRemove=false;
            }
            if(bosRemove){
                removeCount++;
                removeList.push(bosFile);
            }
        }
        console.log(chalk.cyan("文件分析完毕"));
        console.log("bos需要新增文件数",chalk.red(addCount));
        console.log("bos需要更新文件数",chalk.red(updateCount));
        console.log("bos需要移除文件数",chalk.red(removeCount));

        if(addCount>0){
            console.log(chalk.cyan("新增文件："),chalk.red(addCount));
            let addIndex=0;
            for(let i of addList){
               await runUpload(i);
               setBar(++addIndex,addCount);
            }
            console.log("\n");
        }
        if(updateCount>0){
            console.log(chalk.cyan("更新文件："),chalk.red(updateCount));
            let updateIndex=0;
            for(let i of updateList){
                await runUpload(i);
                setBar(++updateIndex,updateCount);
            }
            console.log("\n")

        }
        if(removeCount>0){
            console.log(chalk.cyan("删除文件："),chalk.red(removeCount));
            let removeIndex=0;
            // for(let i of removeList){
            //     await runRemove(i.key);
            //     setBar(++removeIndex,removeCount);
            // }
            console.log("\n")
        }

        console.log(chalk.green("发包完成"));

    }catch (e) {
        console.log(e)
    }
};


bosPublish();