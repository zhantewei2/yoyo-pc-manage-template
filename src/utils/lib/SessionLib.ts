import {session} from "@condyyobeta/fire-ui/session";
import {http} from "@voyo/http";
import {NavListItem,dataFactory} from "../../ice";

export interface EntryGuardCall{
    getNavData:(to:any)=>Promise<NavListItem[]>; //获取navData
    sessionRejectCall?:(to:any)=>void;
    pathRejectCall?:(to:any)=>void; //路径没有权限
    memorySuccessCall?:(to:any)=>void; //内存成功
    storageSuccessCall?:(to:any)=>void; //storageSuccess
    loginFromSessionVal:(sessionVal:string,to:any)=>Promise<string>; //返回新de session value

}

export class SesstionGuardNavListCombine{
    private mainPath:string="/home";
    private loginPath:string="/login";
    private errPath:string="/login";
    private navData:NavListItem[]|null=null;
    private exceptionPath:string[]=["/home/weclome"];

    public initalItem:NavListItem|null=null; //初始激活的item
    /**
     * navData 添加main path
     * @param navData
     */
    preHandlerAppendPath(navData:NavListItem[]):NavListItem[]{
        navData.forEach((i:NavListItem)=>{
            if(i.path){
                i.path=this.mainPath+(i.path.startsWith("/")?i.path:"/"+i.path);
            }
            if(i.children)this.preHandlerAppendPath(i.children);
        });
        return navData;
    }
    getNavData=():NavListItem[]|null=>this.navData;
    setLoginPath=(path:string)=>this.loginPath=path;
    setErrPath=(path:string)=>this.errPath=path;
    /**
     * 登出
     */
    clearSession(){
        this.navData=null;
    }

    /**
     * 预处理navData数据
     * @param navData
     */
    preHandlerNavData(navData:NavListItem[]){
        navData=dataFactory(navData);
        this.preHandlerAppendPath(navData)
    }

    /**
     * 校验当前path是否拥有权限
     * @param path
     */
    authPath=(path:string):boolean=>{
        //例外页面放行
        if (this.exceptionPath.indexOf(path)>=0){
            //目前激活的item置为空
            this.initalItem=null;
            return true;
        }

        const check=(path:string,list:NavListItem[]):NavListItem|null=>{
            for(let i of list){
                if(i.path===path){
                    return i;
                }
                if(i.children){
                    const existsItem:NavListItem|null=check(path,i.children);
                    if(existsItem)return existsItem;
                }
            }
            return null;
        };
        if(this.navData){
            const activeItem=check(path,this.navData);
            if(activeItem){
                this.initalItem=activeItem;
                return true;
            }
            this.initalItem=null;
            return false;
        }else{
            return false;
        }
    };

    /**
     * 寻找第一个item
     */
    findFirstItem(list:NavListItem[]=this.navData||[]):NavListItem|null{
        if(!list||!list.length)return null;

        const find=(list:NavListItem[]):NavListItem|null=>{
            for(let i of list){
                if(i.path)return i;
                if(i.children){
                    let findResult=find(i.children);
                    if(findResult)return findResult;
                }
            }
            return null;
        };
        return find(list);
    }

    /**
     * 展开某一item的所有父级
     * @param item
     */
    openItemAccent(item:NavListItem):NavListItem[]{
        let queue:NavListItem[]=[];
        const open=(i:NavListItem)=>{
            queue.push(i);
            i.open=true;
            if(i.parent)open(i.parent);
        };
        open(item);
        queue=queue.reverse().slice(1);
        return queue;
    }

    resetNavList(listData:NavListItem[]){
        const reset=(list:NavListItem[])=>{
            list.forEach((i:NavListItem)=>{
                if(i.open)i.open=false;
                if(i.active)i.active=false;
                if(i.children)reset(i.children);
            })
        }
        reset(listData);
    }




    /**
     * 路由守卫用
     * @param sessionRejectCall
     * @param pathRejectCall
     * @param memorySuccessCall
     * @param storageSuccessCall
     * @param getNavData
     * @param loginFromSessionVal
     */
    guardEntry=({
                    sessionRejectCall,
                    pathRejectCall,
                    memorySuccessCall,
                    storageSuccessCall,
                    getNavData,
                    loginFromSessionVal
    }:EntryGuardCall)=>{


        return (to:any,from:any,next:any)=>{
            const sessionBack=(errType:"sessionError"|"pathError")=>()=>{
                if(errType==="sessionError"){
                    sessionRejectCall&&sessionRejectCall(to);
                    next(this.loginPath);
                }else if(errType==="pathError"){
                    pathRejectCall&&pathRejectCall(to);
                    next(this.errPath);
                }
            };
            /**
             * 进入二级判断，路由权限判断
             * @param to
             */
            const sessionNext=async(to:any)=>{
                try{
                    if(!this.navData){
                        this.navData=await getNavData(to);
                        this.preHandlerNavData(this.navData);
                    }
                    const authPass:boolean=this.authPath(to.path);
                    if(authPass){
                        next(true);
                    }else{
                        throw "authPath error";
                    }
                }catch(e){
                    sessionBack("pathError")();
                }
            };

            /**
             * 一级判断，用户是否登录
             */
             session.isMemeroy()
                .then((sessionVal:string)=>{
                    if(sessionVal){
                        //session 内存存在
                        memorySuccessCall&&memorySuccessCall(to);
                        sessionNext(to);
                    }else{
                        session.isStorage()
                            .then((sessionVal:string)=>{
                                if(sessionVal){
                                    // storage存在
                                    // re login from sessionKey 重新登录

                                    /**
                                     * 这里对http 进行了操作
                                     */
                                    http.setTicketValue(sessionVal);

                                    loginFromSessionVal(sessionVal,to).then((sessionVal:string)=>{
                                        session.setSession(sessionVal);
                                        storageSuccessCall&&storageSuccessCall(to);
                                        sessionNext(to);
                                    }).catch(sessionBack("sessionError"));
                                }else{
                                    //storage不存在
                                    sessionBack("sessionError")();
                                }
                            });
                    }
                })
        }
    }
}

export {
    session
}