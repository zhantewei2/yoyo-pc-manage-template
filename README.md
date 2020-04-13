导航
---
[Inner Router 内嵌路由](readmes/routerSub.md)

[http请求](https://www.npmjs.com/package/@ztwx/http)

[form表单提交](readmes/form.md)

[ice ui使用](reademe/ice.md)

[web font 字体使用]()

案例文件
---
书写页面前，请先查看案例

地址：

[http://localhost:8080/home/sample-test1](http://localhost:8080/home/sample-test1)

文件地址:
```
src/views/sample/sample-test1-page/sample-test1-page.html
```

项目文件命名
---
- 页面文件夹 `xxx-page`|`xxPage`
- 组件`xxx-component`|`xxComponent`
- 指令 `xxx-directive`|`xxDirective`

项目已启动的情况下，遵守该命名规范 。 

可获得神力，自动创建对应模板。

`webstorm`有时反应慢，下按`ctrl+alt+t`刷新，即可刷新出模板。

项目命令
---
开发环境启动

```
npm run runtime:dev
```
生产打包
```shell
npm run build:prod
```

字体编辑启动
```
npm run webfont
```

目录
---
- `src/envs` 项目配置文件夹
- `src/views` 页面
- `src/commonViews` 通用页面

styles 目录
---
- `src/styles/_element.scss` element 重写变量文件
- `src/styles/var.scss` 项目变量文件
- `src/styles/ice.scss` ice框架变量重写文件

路由文件
---

- `src/router/index.ts` 主文件
- `src/router/views.router.ts` 功能页面路由，主文件
- `src/router/xxx.router.ts` xxx module对应路由文件 
