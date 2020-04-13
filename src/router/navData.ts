import { NavListItem } from "../ice";

/**
 * 注意 path 去掉/home，取/home 后的路径 .
 */
export const navData: NavListItem[] = [
    {
        label: "个人信息", children: [

                    {
                        label: "个人信息管理", children: [
                            { label: "个人资料", path: "sample-test1" },
                            { label: "常用功能设置", path: "sample-test2" },
                            { label: "常用功能", path: "sample2-test1" }
                        ]
                    }

        ]
    }
]
