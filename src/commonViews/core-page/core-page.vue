<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 14:50:12
-->

<template src="./core-page.html">
</template>

<script lang="ts">
import Vue from "vue";
import {of, fromEvent, merge} from "rxjs";
import {map, concatMap, filter} from "rxjs/operators";
import {Component,Watch} from "vue-property-decorator";
import {sessionGuardNavListCombine} from "../../utils/Session";
import {NavListItem,iceInnerRouterPlugin,CacheComponentRef} from "../../ice";
import {projectName,mobileWidth} from "@config";
import RouteInfoList,{IceRouterConfig} from "../../router/views.router";
import {UserHeader} from "./core-page-user";

interface InnerQueue{
    subName:string;
    key:string;
    path:string;
    tag:string;
}

@Component({
    name:"core-page",
    components:{
        "self-user-header":UserHeader
    }
})
export default class extends Vue{
    projectName:string=projectName;
    navData:NavListItem[]=[];
    navAreaData:NavListItem[]=[];
    navAreaDataDict:{[key:string]:NavListItem[]}={};
    activePageName:string="";
    isMobile:boolean=false;
    coreName:string="coreName";
    iceInnerSubject:any;
    innerQueue:InnerQueue[]=[];

    @Watch("$route.path",{immediate:true})
    watchRouterPath(path:string){
        path=path.replace("/home/","");
        /**
         * 从路由文件中，获取当前路由的路名
         **/
        const activeRouteInfo:IceRouterConfig|undefined=RouteInfoList.find((routeInfo:IceRouterConfig)=>routeInfo.path==path);
        if(activeRouteInfo){
            this.activePageName=activeRouteInfo.pageName;
        }
    }
    constructor() {
        super();
    }
    created(){
        /**
         * window resize ..change
        */
        merge(
            of(window.innerWidth),
            fromEvent(window,"resize",{passive:true}).pipe(map(()=>window.innerWidth))
        ).subscribe((width:number)=>{
            if(width>mobileWidth&&this.isMobile){
                this.isMobile=false
            }else if(width<=mobileWidth&&!this.isMobile){
                this.isMobile=true;
            }
        });

         //initialize nav data;
        this.navData=sessionGuardNavListCombine.getNavData()||[];
        let initItem:NavListItem|null=sessionGuardNavListCombine.initalItem;

        if(!initItem){
            initItem=sessionGuardNavListCombine.findFirstItem();
        }
        if(!initItem)return;

        const queueList:NavListItem[]=sessionGuardNavListCombine.openItemAccent(initItem);
        console.log(queueList);
        // this.handlerNavArea(this.navData);
        if(queueList[0]&&queueList[0].children)this.handlerNavArea(queueList[0].children);

        /**
         * inner route监听, 配置 导航栏
        */
         if(!this.iceInnerSubject)this.iceInnerSubject=iceInnerRouterPlugin.listenHistory()
             .pipe(map((cacheComponentRefs:CacheComponentRef[])=>
                cacheComponentRefs
                    .filter(cacheComponentRef=>cacheComponentRef.tag)
                    .map(({subName,path,key,tag})=>({
                        subName,path,key,tag
                    }))
             ))
             .subscribe((arr:InnerQueue[])=>{
                 this.innerQueue=arr||[];
             })
    }
    /**
     * 从初始化中截取数据给左侧导航
     * @param queueList
     */
    handlerNavArea(listData:NavListItem[]){
        this.navAreaDataDict={"key":listData};
    }

    clickSecondaryItem(i:NavListItem){
        this.handlerNavArea(i.children||[]);
        const firstItem=sessionGuardNavListCombine.findFirstItem(this.navAreaDataDict["key"]);
        /**auto open first dir;
        **/
        if(firstItem)sessionGuardNavListCombine.openItemAccent(firstItem);
    }
    beforeDestroy(){
        this.iceInnerSubject&&this.iceInnerSubject.unsubscribe();
    }

    innerBack(){
        this.$iceSub.back();
    }
}
</script>
<style scoped src="./core-page.scss" lang="scss"></style>