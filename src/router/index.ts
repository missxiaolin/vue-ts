import Vue from 'vue'
import Router from 'vue-router'
let routes: any = []

// 利用require.context()自动引入article.ts和user.ts
const routerContext = require.context('./', true, /\.ts$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  console.log(routerModule)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule)
})

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

export default router