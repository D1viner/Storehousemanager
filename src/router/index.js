
import {createRouter,createWebHashHistory} from "vue-router";
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import LoginView from "../views/LoginView.vue"
import StorehouseView from "../views/StorehouseView.vue"
import SthouseView from "../views/SthouseView.vue"
import RegisterView from "../views/RegisterView.vue"
import UserView from "../views/UserView.vue"
import AdminView from "../views/AdminView.vue"

// 1. 定义组件
const routes = [
	{
		"path":"/",redirect:'/login'
	},
	{
		"path":"/home",name:"home",component:HomeView,
		"children":[
				{
					"path":"/home/sthouse",name:"homesthouse",component:SthouseView
				},{
					"path":"/home/storehouse",name:"homestorehouse",component:StorehouseView
				},
		]
	},
	{
		"path":"/about",name:"about",component:AboutView
	},
	{
		"path":"/login",name:"login",component:LoginView
	},
	{
		"path":"/register",name:"register",component:RegisterView
	},
	{
		"path":"/admin",name:"admin",component:AdminView,
		"children":[
			{
				"path":"/admin/sthouse",name:"sthouse",component:SthouseView
			},{
				"path":"/admin/storehouse",name:"storehouse",component:StorehouseView
			},
			{
				"path":"/admin/user",name:"user",component:UserView
			},
	]
	},
	// {
	// 	"path":"/storehouse",name:"storehouse",component:StorehouseView
	// },
	// {
	// 	"path":"/home/sthouse",name:"sthouse",component:SthouseView
	// },
]

const router = createRouter({
	history:createWebHashHistory(),
	routes,
});

export default router;