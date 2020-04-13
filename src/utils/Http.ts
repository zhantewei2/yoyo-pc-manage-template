import {http} from "@ztwx/http";
import {ticketKey,requestHost} from "@config";
http.setHost(requestHost);
http.setTicketKey(ticketKey);

http.setAfterHandler(({status,content},retry:any)=>new Promise<any>((resolve,reject)=>{

    try{
        if(status!=200)throw "http lose";
        let {code,message,result}:{code:number,message:string,result:object}=JSON.parse(content);
        try{
            message=JSON.parse(message)
        }catch(e){}
        if(code!=20000)throw message;
        resolve(result);
    }catch (e) {
        reject(e&&e.toString());
    }
}));
export {
    http
}
