import {DocDir} from "./DocDir";
const path=require("path");
const fs=require("fs");

let [dirName,outDir,ext,navPrefix,routePrefix]=process.argv.slice(2);

if(!dirName&&!outDir){
    throw new Error("must specify dirName");
}

ext=ext||".v.md";

const dirPath=path.join(process.cwd(),dirName);
const outPath=path.join(process.cwd(),outDir);

const docDir=new DocDir(dirPath,outPath,ext,navPrefix,routePrefix);

/**
 * check outputPath
 */
if(!fs.existsSync(outPath))fs.mkdirSync(outPath);

fs.writeFileSync(
    path.join(outPath,"vmd-routes.ts"),
    docDir.toSerialize(docDir.toRoutes())
);

fs.writeFileSync(
    path.join(outPath,"vmd-navData.ts"),
    docDir.toSerialize(docDir.toNavData())
);