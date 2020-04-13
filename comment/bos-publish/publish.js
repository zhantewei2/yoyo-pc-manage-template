const {runUpload}=require("./bosTool");
const {readDir,dir} =require("./readFile");


const resultList=[];
readDir(dir,"",true,opt=>resultList.push(opt));


const run=async()=>{
  for (let i of resultList){
    try{

      await runUpload(i);
      console.log(`${i.fileName} upload successfully`);
      // break;
    }catch(e){
      console.log(e)
      console.error(`${i.fileName} upload failure`);
    }
  }
};



run();
