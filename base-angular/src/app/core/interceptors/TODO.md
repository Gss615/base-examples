# 拦截器说明：
拦截器写到没头绪，暂时先放着，我记得github上有一个angular项目。
里面有node的现成代码，接口是些好的，等把整个angular架构弄的差不多了，再自己模拟http请求顺便处理http的各种异常！


错误处理的除了rxjs的chatcherr 那final有什么用？
是直接在 接口 加入错误提示？

1.  先去serve中的token。
2.  如果没有去本地取。
3.  如果本地也没有，没有权限。


搞了半天好像也不需要 在sever里面存放token，应为用到token的只有请求的时候；
只需要存登录状态就行了，应该是这样吧？
https://github.com/neroniaky/angular-token/blob/master/projects/angular-token/src/lib/angular-token.interceptor.ts