import {Route,NavData,Candy} from "./interface";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path:any=require("path");
const fs=require("fs");

export class DocDir{
    dirpath:string;
    ext:string;
    navPrefix:string;
    routePrefix:string;
    candyList:Candy[];
    outPath:string;
    outRelativePath:string;
    constructor(dirpath:string,outPath:string,ext:string,navPrefix:string="",routePrefix:string="") {
        this.ext=ext;
        this.outPath=outPath;
        this.dirpath=dirpath;
        this.navPrefix=navPrefix;
        this.routePrefix=routePrefix;
        this.candyList=this.readDirToCandyList(dirpath,[]);
        this.outRelativePath=path.relative(outPath,dirpath);

    }

    readDirToCandyList(currentPath:string,collection:any[]):Candy[]{
        const list=fs.readdirSync(currentPath);
        for(let filename of list){
            const filePath=path.join(currentPath,filename);
            const fileStat:any=fs.statSync(filePath);
            if(fileStat.isDirectory()){
                collection.push({
                    filename,
                    filePath,
                    children:this.readDirToCandyList(
                        path.join(currentPath,filename),
                        []
                    )
                })
            }else if(filename.endsWith(this.ext)){
                collection.push({
                    filename,
                    filePath
                });
            }
        }
        return collection;
    }

    toRoutes():Route[]{
        const routes:Route[]=[];
        const listToRoutes=(ls:Candy[],prefix:string="")=>{
             if(!ls)return;
             ls.forEach(i=>{
                 if(i.children){
                     listToRoutes(i.children,path.join(prefix,i.filename));
                 }else{
                    routes.push({
                        path:this.getRoutePath(i.filename,prefix),
                        pageName:this.getLabelName(i.filename),
                        component:`()=>import('${this.getRouteResolve(i.filename,prefix)}')`
                    })
                 }
             })
        };
        listToRoutes(this.candyList,"");
        return routes;
    }
    getRoutePath(filename:string,prefix:string):string{
        return path.join(this.routePrefix,prefix,this.getLabelName(filename));
    }
    getNavPath(filename:string,prefix:string):string{
        return path.join(this.navPrefix,prefix,this.getLabelName(filename));
    }
    getRouteResolve(filename:string,prefix:string){
        return path.join(this.outRelativePath,prefix,filename);
    }
    getLabelName(filename:string){
        const lastIndex=filename.lastIndexOf(this.ext);
        return lastIndex>0?filename.slice(0,lastIndex):filename;
    }

    toNavData():NavData[]{
        const listToNavData=(ls:Candy[],list:NavData[],prefix:string=""):NavData[]=>{
            if(!ls)return [];
            for(let i of ls){
                if(i.children){
                    list.push({
                        label:this.getLabelName(i.filename),
                        children:listToNavData(i.children,[],i.filename)
                    });
                }else{
                    list.push({
                        label:this.getLabelName(i.filename),
                        path:this.getNavPath(i.filename,prefix)
                    })
                }
            }
            return list;
        };

        return listToNavData(this.candyList,[],"");
    }

    toSerialize(obj:any[]){
        let objContent:string=JSON.stringify(obj,null,4);
        objContent=objContent.replace(/"component":\s+?"([^"]*)?"/g,(v:any,group1:string)=>{
            return `"component":${group1}`
        });
        return `
export default ${objContent};
        `
    }

}