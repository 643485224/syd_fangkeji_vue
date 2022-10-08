import Vue from "vue";
import VueRouter from "vue-router";
// import chonks from '@/page/setting/setting3'
import store from '../store/store'

Vue.use(VueRouter);
// Vue.use(router);

// export default new routers({
//     router:[
//        {
//         path: "/offlineHome/offlineThree",
//         meta: { title: "选择被访人" },
//         name: "offlineThree",
//         component: () => import("@/page/offline/offline3.vue")
//        },
//        {
//            path:'./chonks',
//            name:'chonks',
//            component:chonks
//        }

//     ]
// });
// let aaa = false;
const routes = [
	{
		path: "/",
		meta: { title: "登录页" },
		name: "login",
		component: () => import("@/views/login"),
		beforeEnter: (to, from, next) => {
            if (!store.state.password  ){
                next()
            } else {
                if(store.state.httpform.onlineMode == true){
                    next({ name: "onsiteHome" });
                }else {
                    next({ name: "offlineHome" });
                }
            }
            console.log(store.state);
        }

		// components: { login: Login },
	},
	{
		path: "/offlineHome",
		meta: { title: "访客登记系统" },
		component: () => import("@/page/offline/offlineRoot.vue"),
		children: [
			{
				path: "/offlineHome/",
				meta: { title: "访客登记系统" },
				name: "offlineHome",
				component: () => import("@/page/offline/offline.vue"),
			},
			{
				path: "/offlineHome/offlineOne",
				meta: { title: "访客登记" },
				name: "offlineOne",
				component: () => import("@/page/offline/offline1.vue"),
			},
			{
				path: "/offlineHome/offlineTwo",
				meta: { title: "完善访客信息" },
				name: "offlineTwo",
				component: () => import("@/page/offline/offline2.vue"),
			},
			// {
            //     path: "/onsiteHome/dialogComponent",
            //     meta: { title: "选择被访人" },//弹窗
            //     name: "dialogComponent",
            //     component: () => import("@/page/offline/offline3.vue"),
            // },
			{
				path: "/offlineHome/offlineFour",
				meta: { title: "确认访客信息" },
				name: "offlineFour",
				component: () => import("@/page/offline/offline4.vue"),
			},
			{
				path: "/offlineHome/offlineFive",
				meta: { title: "打印来访信息" },
				name: "offlineFive",
				component: () => import("@/page/offline/offline5.vue"),
			},
		],
	},
	{
		path: "/onsiteHome",
		meta: { title: "访客登记系统" },
		component: () => import("@/page/onsite/onsiteRoot.vue"),
		children: [
			{
				path: "/onsiteHome/",
				meta: { title: "访客登记系统" },
				name: "onsiteHome",
				component: () => import("@/page/onsite/onsite.vue"),
			},
			{
				path: "/onsiteHome/visit-mode",
				meta: { title: "选择来访方式" },
				name: "visit-mode",
				component: () => import("@/page/onsite/visit-mode.vue"),
			},
			
			{
				path: "/onsiteHome/onsiteOne",
				meta: { title: "访客登记" },
				name: "onsiteOne",
				component: () => import("@/page/onsite/onsite1.vue"),
			},
			{
				path: "/onsiteHome/onsiteTwo",
				meta: { title: "完善访客信息" },
				name: "onsiteTwo",
				component: () => import("@/page/onsite/onsite2.vue"),
			},
			// {
			// 	path: "/onsiteHome/dialogComponent",
			// 	meta: { title: "选择被访人" }, //弹窗
			// 	name: "dialogComponent",
			// 	component: () => import("@/page/onsite/onsite3.vue"),
			// },
			{
				path: "/onsiteHome/onsiteFour",
				meta: { title: "确认访客信息" },
				name: "onsiteFour",
				component: () => import("@/page/onsite/onsite4.vue"),
			},
			{
				path: "/onsiteHome/onsiteFive",
				meta: { title: "打印来访信息" },
				name: "onsiteFive",
				component: () => import("@/page/onsite/onsite5.vue"),
			},
		],
	},
	{
		path: "/appointment",
		meta: { title: "预约来访" },
		component: () => import("@/page/appointment/appointmentRoot.vue"),
		children: [
			{
				path: "/appointment/",
				meta: { title: "预约来访" },
				name: "appointment",
				component: () => import("@/page/appointment/appointment.vue"),
			},
			{
				path: "/appointment/appointmentOne",
				meta: { title: "预约来访登记" },
				name: "appointmentOne",
				component: () => import("@/page/appointment/appointment1.vue"),
			},
			{
				path: "/appointment/appointmentTwo",
				meta: { title: "选择被访人" },
				name: "appointmentTwo",
				component: () => import("@/page/appointment/appointment2.vue"),
			},
			{
				path: "/appointment/appointmentThree",
				meta: { title: "确认登记信息" },
				name: "appointmentThree",
				component: () => import("@/page/appointment/appointment3.vue"),
			},
			{
				path: "/appointment/appointmentFour",
				meta: { title: "打印来访信息" },
				name: "appointmentFour",
				component: () => import("@/page/appointment/appointment4.vue"),
			},
		],
	},
	{
		path: "/setting",
		meta: { title: "系统设置" },
		name: "settingRoot",
		component: () => import("@/page/setting/settingRoot.vue"),
		children: [
			{
				path: "/setting/",
				meta: { title: "系统设置" },
				name: "setting",
				component: () => import("@/page/setting/setting.vue"),
			},
			{
				path: "/setting/settingZero",
				meta: { title: "杂项配置" },
				name: "settingZero",
				component: () => import("@/page/setting/setting0.vue"),
			},
			{
				path: "/setting/settingOne",
				meta: { title: "模式配置" },
				name: "settingOne",
				component: () => import("@/page/setting/setting1.vue"),
			},
			{
				path: "/setting/settingTwo",
				meta: { title: "修改密码" },
				name: "settingTwo",
				component: () => import("@/page/setting/setting2.vue"),
			},
			{
				path: "/setting/settingThree",
				meta: { title: "主题配置" },
				name: "settingThree",
				component: () => import("@/page/setting/setting3.vue"),
			},
			{
				path: "/setting/settingFour",
				meta: { title: "访客记录" },
				name: "settingFour",
				component: () => import("@/page/setting/setting4.vue"),
			},

			{
				path: "/setting/settingFive",
				meta: { title: "员工数据" },
				name: "settingFive",
				component: () => import("@/page/setting/setting5.vue"),
			},
			{
				path: "/setting/settingSix",
				meta: { title: "关于我们" },
				name: "settingSix",
				component: () => import("@/page/setting/setting6.vue"),
			},
			{
				path: "/setting/settingSeven",
				meta: { title: "黑名单管理" },
				name: "settingSeven",
				component: () => import("@/page/setting/setting7.vue"),
			},
		],
	},
	{
		path: "/checkout",
		meta: { title: "访客签离" },
		name: "checkout",
		component: () => import("@/page/checkout/checkout.vue"),
	},
	{
		path: "/cartoon",
		meta: { title: "获取证件信息" },
		name: "cartoon",
		component: () => import("@/components/cartoon/index.vue"),
	},
	{
		path: "/ceShi",
		meta: { title: "测试" },
		name: "ceShi",
		component: () => import("@/components/canvas/index.vue"),
	},

	{
		path: "/layout",
		name: "layout",
		component: () => import("@/views/layout"),
	},
];

const router = new VueRouter({
	// mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
