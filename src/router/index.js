import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import NProgress from 'nprogress';  //第三方的进度条库
import 'nprogress/nprogress.css';   //第三方的进度条库


Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
	{
		path: '/',
		name: '高校二手物品交易商城',
		component: () => import('../views/front/index.vue'),
		redirect: "/shop",
		children: [
			{
				path: 'shop',
				name: '商城',
				component: () => import('../views/front/Shop.vue')
			},
			{
				path: 'release',
				name: '发布商品',
				component: () => import('../views/front/Release.vue')
			},
			{
				path: 'my_goods',
				name: '我的商品',
				component: () => import('../views/front/My_goods.vue')
			},
			{
				path: 'my_goods_details',
				name: '我的商品详情',
				component: () => import('../views/front/My_goods_details.vue')
			},
			{
				path: 'update_goods',
				name: '更改成功',
				component: () => import('../views/front/update_goods.vue')
			},
			{
				path: 'my_order',
				name: '我的订单',
				component: () => import('../views/front/My_order.vue')
			},
			{
				path: 'my_buyorder_details',
				name: '订单详情',
				component: () => import('../views/front/My_buyorder_details.vue')
			},
			{
				path: 'my_sellorder_details',
				name: '订单详情',
				component: () => import('../views/front/My_sellorder_details.vue')
			},
			{
				path: 'my_college',
				name: '收藏夹',
				component: () => import('../views/front/My_college.vue')
			},
			{
				path: 'my_personal',
				name: '个人信息',
				component: () => import('../views/front/My_personal.vue')
			},
			{
				path: 'my_leave',
				name: '我的留言',
				component: () => import('../views/front/My_leave .vue')
			},
			{
				path: 'goods_details',
				name: '商品详情',
				component: () => import('../views/front/Goods_details.vue')
			},
			{
				path: 'submit_order',
				name: '确认订单',
				component: () => import('../views/front/Submit_order.vue')
			},
			{
				path: 'pay',
				name: '支付窗口',
				component: () => import('../views/front/Pay.vue')
			},
			{
				path: 'release_success',
				name: '支付成功',
				component: () => import('../views/front/Release_success.vue')
			},
			{
				path: '/s_login',
				name: '用户登录',
				component: () => import('../views/front/S_login.vue')
			},
		]
	},
	{
		path: '/login',
		name: '登录',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/',
		name: '管理',
		component: () => import('../views/Manage.vue'),
		redirect: "/home",
		children: [{
				path: 'home',
				name: '主页',
				component: () => import('../views/Home.vue')
			},
			{
				path: 'personal',
				name: '个人中心',
				component: () => import('../views/Personal.vue')
			},
			{
				path: 'admin',
				name: '管理员用户',
				component: () => import('../views/Admin.vue')
			},
			{
				path: 'student',
				name: '学生用户',
				component: () => import('../views/Student.vue')
			},
			{
				path: 'goods',
				name: '商品审核',
				component: () => import('../views/Goods.vue')
			},
			{
				path: 'order',
				name: '订单表',
				component: () => import('../views/Order.vue')
			},
		]
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../views/404.vue')
	},
]

const router = new VueRouter({
	mode: 'history',             //跳转而无须重新加载页面
	base: process.env.BASE_URL, 
	routes
})


NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3
})

// 路由守卫
router.beforeEach((to, from, next) => {
	/* // 未找到路由的情况
	  if (!to.matched.length) {
	    const storeMenus = localStorage.getItem("menus")
	    if (storeMenus) {
	      next("/404")
	    } else {
	      // 跳回登录页面
	      next("/login")
	    }
	  } */
	
	
	localStorage.setItem("currentPathName", to.name) // 设置当前的路由名称，为了在Header组件中去使用
	store.commit("setPath") // 触发store的数据更新
	
	NProgress.start();//顶部加载条
	next() // 放行路由
})

//路由跳转结束
router.afterEach(() => {
    NProgress.done()
})

export default router
