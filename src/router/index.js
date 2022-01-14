import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes=[
  {
    path: '/',
    name:'Layout',
    component:() => import('../views/layout.vue'),
    redirect:{name:'index'},
    children:[
      {
        path:"/index",
        name:"index",
        component: () => import('../views/index/index.vue')
      },
      {
        path:"/account/all",
        name:"account_all",
        meta:{bread:["账户管理","所有人员"]},
        component:()=>import("../views/account/all.vue")
      },
      {
        path:"/account/business",
        name:"account_business",
        meta:{bread:["账户管理","业务人员"]},
        component:()=>import("../views/account/business.vue")
      },
      {
        path:"/account/audit",
        name:"account_audit",
        meta:{bread:["账户管理","审核人员"]},
        component:()=>import("../views/account/audit.vue")
      },
      {
        path:"/account/risk",
        name:"account_disk",
        meta:{bread:["账户管理","风控经理"]},
        component:()=>import("../views/account/risk.vue")
      },
      {
        path:"/account/admin",
        name:"account_admin",
        meta:{bread:["账户管理","管理员"]},
        component:()=>import("../views/account/admin.vue")
      },
      //产品管理模块
      {
        path:"/product/all",
        name:"product_all",
        meta:{bread:["产品管理","全部产品"]},
        component:()=>import("../views/product/all.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path:"*",
    name:"404",
    component: () => import('../views/404.vue')
  }
]
const router = new VueRouter({
  routes
})

export default router
