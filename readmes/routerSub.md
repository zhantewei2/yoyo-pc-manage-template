IceInnerRouter介绍
---

### 路由注册
在`/path`路由下，配置两个子路由`sub1`,`sub2`。
```js
[
    {path:"/path",component:()=>import("sample.vue"),pageName:"页面1",
      props:{
        subView:[
        {path:"sub1",subName:"编辑查看",component:()=>import("xxx/sub1.component.vue")},
        {path:"sub2",subName:"新增",component:()=>import("xxx/sub2.component.vue")}
        ]
      }
    
    }
]
```
- **primaryRoute**  `{path:"/path"}` 主路由
- **subViewRoute**   `{path:"sub1"}` 和  `{path:"sub2"}` 子路由

- **innerRoute组**  以上为一个**innerRoute组**，所有路由栈内的页面均会被缓存。直至出栈，或离开该innerRouter组。


### Vue方法

- **$iceRouter.push(`subViewPath`)**  推入新的子路由
    - `subViewPath` 子路由的`path`值。
- **$iceRouter.toPrimary()** 回到主路由
- **$iceRouter.back()**  返回 上一个 inner route

### 数据注入

子路由下，可获取主路由内的数据。
```typescript
class Sub1Component extends Vue{
    @Prop({})iceParentData:Record<string, any>; //父级的data信息
    @Prop({})iceParent:any;                      //完整的父级对象
}
```
子路由 均可共享**primaryRoute**内的data数据。

*避免两两页面间数据传递和反馈带来多余的操作。*