import Vue from "vue";

import {
    IceContainerModule,
    FireContainerModule,
    dataFactory,
    NavListItem,
    IceComponentModule,
    IceBtnLoadingModule,BtnLoadRef,
    IceInnerRouterModule,
    IceInnerRouterPlugin,
    CacheComponentRef,
    ComponentModule,
    IceLoginPageModule
} from "@condyyobeta/fire-ui";

window.Vue=Vue;
Vue.use(FireContainerModule);
Vue.use(IceContainerModule);
Vue.use(IceComponentModule);
Vue.use(IceBtnLoadingModule);
Vue.use(ComponentModule);
Vue.use(IceLoginPageModule);
/**
 *
 */
const iceInnerRouterPlugin=new IceInnerRouterPlugin({
    history:false,
    visitByUrl:false
});
Vue.use(IceInnerRouterModule([
    iceInnerRouterPlugin
]));


export {
    dataFactory,
    NavListItem,
    BtnLoadRef,
    iceInnerRouterPlugin,
    CacheComponentRef
}
