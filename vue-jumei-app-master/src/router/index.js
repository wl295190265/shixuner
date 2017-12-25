import Vue from 'vue'
import Router from 'vue-router'


//可以使用路由懒加载
Vue.use(Router)

export default new Router({
  routes: [
    { //这里要设置一个默认的主页面 后面才起作用 /代表根目录
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index/index'], resolve),
      redirect: '/index/page1'
    },
//  {
//  	path:"*",
//  	component:404
//  },
    { 
      path: '/index',
      component: resolve => require(['@/pages/index/index'], resolve),
      meta: {keepAlive: true},
      children: [
        {
          path: '',
          component: resolve => require(['@/pages/index/index'], resolve)
        },
        {
          path: 'page1', 
          name: 'page1',
          component: resolve => require(['@/pages/index/page1'], resolve)
        },
        {
          path: 'page2',
          name: 'page2',
          component: resolve => require(['@/pages/index/page2'], resolve)
        },
        {
          path: 'page3',
          name: 'page3',
          component: resolve => require(['@/pages/index/page3'], resolve)
        },
        {
          path: 'page4',
          name: 'page4',
          component: resolve => require(['@/pages/index/page4'], resolve)
        },
        {
          path: 'page5',
          name: 'page5',
          component: resolve => require(['@/pages/index/page5'], resolve)
        },
        {
          path: 'page6',
          name: 'page6',
          component: resolve => require(['@/pages/index/page6'], resolve)
        },
        {
          path: 'page7',
          component: resolve => require(['@/pages/index/page7'], resolve)
        },
      ]
    },
    {
      path: '/brandsale',
      name: 'brandSale', 
      component: resolve => require(['@/pages/brandsale/index'], resolve)
    },
    {
        path: '/address_manager',
        component: resolve => require(['@/pages/myself/address_manager'], resolve),
        meta: {
            title: '地址管理'
        }
    }, {
         path: '/address_add',
        component: resolve => require(['@/pages/myself/address_add'], resolve),
        meta: {
            title: '地址新加'
        }
    }, {
        path: '/address_edit',
        component: resolve => require(['@/pages/myself/address_edit'], resolve),
        meta: {
            title: '地址编辑'
        }
    },
    {
      path: '/livecommunity',
      name: 'liveCommunity',
      component:  resolve => require(['@/pages/livecommunity/index'], resolve)
    },
    {
      path: '/shopcart',
      name: 'shopCart',
      component:  resolve => require(['@/pages/shopCart/index'], resolve)
    },
    {
      path: '/myself',
      name: 'mySelf',
      component: resolve => require(['@/pages/mySelf/index'], resolve)
    },
    {
      path: "/setter",
      name: 'setter',
      component:  resolve => require(['@/pages/mySelf/setter'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component:  resolve => require(['@/pages/mySelf/login'], resolve)
    },
    {
      path: '/indent',
      name: 'indent', 
      component: resolve => require(['@/pages/indent/index'], resolve)
    },
    {
      path: '/indentDetail',
      name: 'indentDetail', 
      component: resolve => require(['@/pages/indent/indentDetail'], resolve)
    },
    {
      path: '/photo',
      name: 'photo', 
      component: resolve => require(['@/pages/myself/photo'], resolve)
    },
     {
      path: '/address',
      name: 'address', 
      component: resolve => require(['@/pages/myself/address_manager'], resolve)
    },
   
    {
      path: '/address_add',
      name: 'address_add', 
      component: resolve => require(['@/pages/myself/address_add'], resolve)
    },
     {
      path: '/userinfo',
      name: 'address', 
      component: resolve => require(['@/pages/myself/user_info'], resolve)
    },
    {
      path: '/red_package',
      name: 'red_package', 
      component: resolve => require(['@/pages/myself/red_package'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component:  resolve => require(['@/pages/product/index'], resolve),
      redirect: '/product/info', 
      children: [
        {
          path: 'info',
          name: 'productInfo',
          component: resolve => require(['@/pages/product/info'], resolve)
        },
        {
          path: 'detail',
          name: 'productDetail',
          component: resolve => require(['@/pages/product/detail'], resolve)
        },
        {
          path: 'comment',
          name: 'productComment',
          component: resolve => require(['@/pages/product/comment'], resolve)
        }
      ]
    },

  ]
})
