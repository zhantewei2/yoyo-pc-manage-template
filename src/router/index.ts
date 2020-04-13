import Vue from 'vue'
import VueRouter from 'vue-router'
import CorePage from "../commonViews/core-page/core-page.vue";
import ViewsRoutes from "./views.router"
import {sessionGuardNavListCombine} from "../utils/Session";
import {http} from "@ztwx/http";
import {navData} from "./navData";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
      {path:"/login",component:()=>import("../commonViews/login-page/login-page.vue")},
      {path:"/error",component:()=>import("../commonViews/error-page/error-page.vue")},
      {
          path:"/home",
          component:CorePage,
          children:ViewsRoutes,
          beforeEnter:sessionGuardNavListCombine.guardEntry({
            getNavData:(to:any)=>{
                /**
                 * 返回从服务器获取的 Promise<navData>,
                 */

                //暂时返回本地数据
                return Promise.resolve(navData)
            },
            loginFromSessionVal:(sessionVal:string,to:any)=>{
                /**
                 * 用session ticket去登录，返回 Promise<sessionTicket>
                 */
                console.debug("login from sessionVal");
                return new Promise((resolve,reject)=>{

                    store.dispatch("user/loginFromTicket",{
                        ticket:sessionVal,
                        callback:(ticket:string)=>ticket?resolve(ticket):reject()
                    });
                })
            },
            sessionRejectCall:(to:any)=>{
                console.debug("session reject");
            }
          })
      },
      {
          path:"*",redirect:"/login"
      }
  ]
});

export default router
