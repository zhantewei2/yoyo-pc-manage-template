import Vue from "vue";
import {BtnLoadRef} from "./ice";
declare module "vue/types/vue" {
  interface Vue {
    $iceBtnLoad:()=>BtnLoadRef;
    $iceSub:{
      push:(path:string,params?:Record<string, any>)=>void;
      back:()=>void;
      toPrimary:()=>void;
    }
    $iceRouteStore:{[key:string]:any}
    $iceInnerRouteTargetComponent:any;

  }
}
