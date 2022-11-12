import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import NotFound from '../views/NotFound'
import Admins from '../views/Admins'
import Node from '../views/Node'
import Info from '../views/Info'
import List from '../views/List'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path:'/admins',
    name:'Admins',
    component:Admins,
    hidden:true,
    children: [
      {
        path: 'info',
        name: 'Info',
        component: Info
      },
      {
        path: 'list',
        name: 'List',
        component: List
      },
      {
        path: 'node',
        name: 'Node',
        component: Node
      },
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
]
//解决重复访问路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const router = new VueRouter({
  routes,
  mode: 'history' //fuck xxx
})

export default router
