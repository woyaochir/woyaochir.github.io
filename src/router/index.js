import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

 // 1. 创建路由组件

 Vue.use(VueRouter)

 // 2. 将路由与组件进行映射
 const routes = [
  // 主路由
  {
    path: '/',
    component: Main,
    name:'Main',  // 根据name来寻找他的父级
    redirect:'/home',
    children: [
      // {path: 'home', name: 'home', component: Home}, // 首页
      // {path: 'user', name: 'user', component: User}, // 用户管理
      // {path: 'mall', name: 'mall', component: Mall}, // 商品管理
      // {path: 'page1', name: 'page1', component: PageOne}, // 页面1
      // {path: 'page2', name: 'page2', component: PageTwo}  // 页面2
    ]
  },
  {
    path:'/login',
    name:'login',
    component: Login
  }
 ]

 // 3. 创建router实例
 const router = new VueRouter({
  routes
 })

 export default router