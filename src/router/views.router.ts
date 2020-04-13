import weclomePage from "../views/common/weclome-page/weclome-page.vue";
import { IceRouterConfig } from "./iceRouterConfig.interface";
export {
    IceRouterConfig
}

const routes: IceRouterConfig[] = [
    /**
     * 欢迎页面
     */
    {
        path: "weclome", component: <any>weclomePage, pageName: ""
    },
    /**
     * 下面列子可以删掉
     */
    {
        path: "sample-test1", component: () => import("../views/sample/sample-test1-page/sample-test1-page.vue"), pageName: "个人资料"
    },
    {
        path: "sample-test2", component: () => import("../views/sample/sample-test2-page/sample-test2-page.vue"), pageName: "常用功能设置"
    },
    {
        path: "sample2-test1", component: () => import("../views/sample2/sample2-test1-page/sample2-test1-page.vue"), pageName: "sample2 test1",
        props: {
            "subView": [
                { path: "test2", subName: "子测试页2", component: () => import("../views/sample2/sample2-test1-page/test2-component/test2-component.vue") },
                { path: "test1", subName: "子测试页1", component: () => import("../views/sample2/sample2-test1-page/test-component/test-component.vue") }
            ]
        }
    },
    {
        path: "sample2-test2", component: () => import("../views/sample2/sample2-test2-page/sample2-test2-page.vue"), pageName: "sample2 test2"
    }
];

export default routes;
