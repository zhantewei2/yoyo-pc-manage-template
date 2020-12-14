### 登录页登录

```
graph TB
A[登录页:src/commonViews/login-page]-->B[登录action发起:user/loginFromAccount]
B-->|发起登录request|C[保存用户信息:changeUserInfo]
C-.-保存state用户信息
C-.-设置全局http请求头信息
C-.-sessionStorage保存用户ticket
```

#### 功能页路由守卫（loginFromSessionVal）

```
sequenceDiagram
    loop 路由守卫
         src/router/index.ts->>sessionGuardNavListCombine:进入home子路由页
         sessionGuardNavListCombine->>进入功能页: 用户登录态存在于内存，进入成功
         sessionGuardNavListCombine->>sessionGuardNavListCombine: sessionStorage不存在，进入失败，重定位至登录页
         sessionGuardNavListCombine->>src/router/index.ts: 内存不存在，sessionStorage存在用户登录态，回传ticket（页面刷新）
         src/router/index.ts->>src/router/index.ts:获取ticket
              src/router/index.ts->>user.store.ts:发起user/loginFromTicket action
        user.store.ts->>user.store.ts:调用loginFromTicket完成session登录
        user.store.ts->>src/router/index.ts: 登录成功返回ticket,失败返回空
        src/router/index.ts->>src/router/index.ts: 登录失败，重定位至登录页
        src/router/index.ts->>进入功能页:登录成功。
    end
```