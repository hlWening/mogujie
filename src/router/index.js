import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = r => require.ensure([], () => r(require('../components/home')), 'home')

const Category = r => require.ensure([], () => r(require('../components/category')), 'category')

const SoppingCart = r => require.ensure([], () => r(require('../components/sopping-cart')), 'sopping-cart')

const UserCenter = r => require.ensure([], () => r(require('../components/user-center')), 'user-center')

const Login = r => require.ensure([], () => r(require('../components/login')), 'login')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/sopping-cart',
      component: SoppingCart
    },
    {
      path: '/user',
      component: UserCenter,
      meta: {
        requireAuth: true // 跳转用户中心的时候实现路由拦截
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
