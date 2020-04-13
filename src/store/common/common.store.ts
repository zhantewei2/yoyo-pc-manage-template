import {Module,ActionContext} from "vuex";

export type VariousType="warn"|"error"|"info"|"success";

export interface CommonState{
    messageContent:string;
    messageType:VariousType;
    messageShow:boolean;
    alertContent:string;
    alertType:VariousType;
    alertShow:boolean;
}
export interface InformationActionType{
    content:string;
    type:VariousType;
}


const commonStore:Module<CommonState, any>={
    state:{
      messageContent:"",
      messageType:"info",
      messageShow:false,
      alertContent:"",
      alertType:"info",
      alertShow:false
    },
    mutations:{
        openMessage(state:CommonState,{content:messageContent,type:messageType}:InformationActionType){
            Object.assign(state,{messageShow:true,messageContent,messageType});
        },
        openAlert(state:CommonState,{content:alertContent,type:alertType}:InformationActionType){
            Object.assign(state,{alertShow:true,alertContent,alertType});
        }
    },
    actions:{
        message(
            {commit}:ActionContext<CommonState, any>,
            ActionValue:InformationActionType
        ){
            commit("openMessage",ActionValue);
        },
        alert(
            {commit}:ActionContext<CommonState, any>,
            ActionValue:InformationActionType
        ){
            commit("openAlert",ActionValue);
        },
        err({commit},content:string){
            commit("openMessage",{content,messageType:"error"})
        },

    },

};

export default commonStore;