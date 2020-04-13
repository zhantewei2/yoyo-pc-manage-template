import Vue from "vue";
import VueRouter from "vue-router";
import corePage from "../views/core/docs-home-page/docs-home-page.vue";
import vmdRoutes from "./vmd-routes";
Vue.use(VueRouter);


const router=new VueRouter({
    mode:"history",
    base:process.env.BASE_URL,
    routes:[
        {
            path:"/docs",
            component:corePage,
            children:vmdRoutes
        },
        {
            path:"*",
            redirect:"/docs"
        }
    ]
});

export default router;