const fs=require("fs");
const path=require("path");
const crypto=require("crypto");

const http_headers={
  'html':'text/html;charset=utf8',
  'txt':'text/html',
  'css':'text/css',
  'jpg':'image/jpeg',
  'png':'image/png',
  'git':'image/gif',
  'jpeg':'image/jpeg',
  'ico':'image/x-icon',
  'js':'application/x-javascript',
  'woff':'application/x-font-woff',
  'woff2':'application/x-font-woff',
  'svg':'image/svg+xml',
  'oft':'application/x-font-otf',
  'ttf':'application/x-font-ttf',
  'eot':'application/vnd.ms-fontobject',
  'mp4':'video/mpeg4',
  'ogg':'application/ogg'
};

const getContentType=extension=>http_headers[extension]||"application/octet-stream";


const getSuffix=(filename)=>{
  try {
    return filename.match(/[^\.]\w+$/).toString() || "";
  }catch(e){
    return "";
  }
};

const getFileMd5=(filePath)=>{
  const fileBuffer=fs.readFileSync(filePath);
  return crypto.createHash("md5").update(fileBuffer).digest("hex");
};

const readDir=(dir,relPath,useMD5,run)=>{
  const list=fs.readdirSync(dir);
  list.forEach(filePath=>{
    const absFilePath=path.join(dir,filePath);
    const stat=fs.statSync(absFilePath);
    if(stat.isDirectory()){
      const nextRelPath=path.join(relPath,filePath);
      run({
        absPath:absFilePath,
        type:"dir",
        relPath:nextRelPath,
        fileName:filePath,
        mtime:stat.mtime
      });
      readDir(absFilePath,nextRelPath,useMD5,run);
    }else{
      let md5;
      if (useMD5)md5=getFileMd5(absFilePath);
      run({
        suffix:getSuffix(absFilePath),
        absPath:absFilePath,
        type:"file",
        fileName:filePath,
        relPath,
        mtime:stat.mtime,
        md5
      })
    }

  })
};




const dir=path.join(__dirname,"../../dist");

exports.dir=dir;
exports.readDir=readDir;
exports.getContentType=getContentType;
exports.getFileMd5=getFileMd5;