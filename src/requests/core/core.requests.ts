import {http} from "@voyo/http";
import {Observable,of,throwError} from "rxjs";
import {mergeMap} from "rxjs/operators";


/**
 * 用户账号密码登录
 * @param params
 */
export interface LoginParams{
    username:string;
    password:string;
}
export interface LoginResult{
    ticket:string;
    username:string;
    header:string;
}
export const loginFromAccount=(params:LoginParams):Observable<LoginResult>=>{

    // return http.xhr("post","api-user/login",params); //从后台请求数据

    return of({"ticket":"xxxxxxxasa","username":"accountLogin","header":"xxx.jpg"})  //假数据模拟
};

/**
 * 用户从ticket中登录
 * @param ticket
 */
export const loginFromTicket=(ticket:string):Observable<LoginResult>=>{
    // return http.xhr("post","api-user/relogin",{ticket}); //post 请求体传参，登录
    // return http.xhr("post","api-user/relogin",{},{header:{"cm-ticket":ticket}});  //post 头信息传参，登录
    console.debug("login from ticket request");
    return of({"ticket":"xxxxxxxasa","username":"AccountTicket","header":"xxx.jpg"});  //假数据模拟
};

/**
 * 用户登出
 */
export const logout=():Observable<any>=>{
    // return of(true).pipe(mergeMap(()=>throwError("11")))
    return of(true);
};