
import {createRouter,createWebHashHistory} from "vue-router";
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import LoginView from "../views/LoginView.vue"
import StorehouseView from "../views/StorehouseView.vue"
import SthouseView from "../views/SthouseView.vue"


// 1. 定义组件
const routes = [
	{
		"path":"/",name:"home",component:HomeView
	},
	{
		"path":"/about",name:"about",component:AboutView
	},
	{
		"path":"/login",name:"login",component:LoginView
	},{
		"path":"/storehouse",name:"storehouse",component:StorehouseView
	},{
		"path":"/sthouse",name:"sthouse",component:SthouseView
	},
]

const router = createRouter({
	history:createWebHashHistory(),
	routes,
});

export default router;